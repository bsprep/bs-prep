import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { hasAdminRole } from '@/lib/security/admin-role'
import { writeRateLimiter } from '@/lib/rate-limit'
import crypto from 'crypto'

type Params = {
  params: Promise<{ id: string }>
}

// Helper to generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Helper to send OTP email (placeholder - implement with your email service)
async function sendOTPEmail(email: string, otp: string, userName: string): Promise<boolean> {
  try {
    // TODO: Integrate with email service (SendGrid, Resend, AWS SES, etc.)
    console.log(`OTP for ${email}: ${otp}`) // Debug log
    
    // Example using fetch to a third-party email service
    // For now, just return true assuming email was sent
    // In production, implement actual email sending
    return true
  } catch (error) {
    console.error('Failed to send OTP email:', error)
    return false
  }
}

// POST: Initiate user deletion by generating and sending OTP
export async function POST(req: NextRequest, { params }: Params) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rl = await writeRateLimiter.check(ip)
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.reset - Date.now()) / 1000)) } }
    )
  }

  try {
    const { id: userId } = await params

    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    // Verify admin access
    const supabase = await createClient()
    const { data: { user: adminUser }, error: authError } = await supabase.auth.getUser()

    if (authError || !adminUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const isAdmin = await hasAdminRole(adminUser.id, adminUser.email)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Get the user to be deleted
    const service = createServiceRoleClient()
    const { data: targetUser, error: userError } = await service.auth.admin.getUserById(userId)

    if (userError || !targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if target user is an admin - admins cannot delete other admins
    const { data: targetProfile } = await service
      .from('profiles')
      .select('role, first_name, last_name')
      .eq('id', userId)
      .maybeSingle()

    if (targetProfile?.role === 'admin') {
      return NextResponse.json(
        { error: 'Cannot delete admin accounts. Only general users can be deleted.' },
        { status: 403 }
      )
    }

    // Generate OTP
    const otp = generateOTP()

    // Store OTP in database with 15-minute expiration
    const { error: otpError } = await service
      .from('deletion_otp_codes')
      .upsert(
        {
          user_id: userId,
          email: targetUser.email || '',
          otp_code: otp,
          is_verified: false,
          attempts: 0,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          deleted_by_admin_id: adminUser.id,
        },
        {
          onConflict: 'user_id,email',
        }
      )

    if (otpError) {
      console.error('Failed to store OTP:', otpError)
      return NextResponse.json(
        { error: 'Failed to generate OTP' },
        { status: 500 }
      )
    }

    // Send OTP via email
    const userName = targetProfile?.first_name || targetUser.email?.split('@')[0] || 'User'
    const emailSent = await sendOTPEmail(targetUser.email || '', otp, userName)

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'OTP sent to user email',
        email: targetUser.email,
        masked_email: targetUser.email ? `${targetUser.email.substring(0, 2)}***@${targetUser.email.split('@')[1]}` : 'user email',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
