import { NextResponse } from "next/server"
import { sendEndTermResultsEmail } from "@/lib/notifications/end-term-email"
import { createServiceRoleClient } from "@/lib/supabase/server"

// POST /api/admin/send-end-term-email
// Broadcasts the "End Term Results Are Out" email to the provided list of users
export async function POST() {
  const recipients = [
    "25f3001503@ds.study.iitm.ac.in",
    "tharanidharan896@gmail.com",
    "25f2008224@ds.study.iitm.ac.in",
    "bskrish2008@gmail.com",
    "patidarrinku21@gmail.com",
    "suvithanagarajan1143@gmail.com",
    "25f3000540@ds.study.iitm.ac.in",
    "nikithanagami@gmail.com",
    "25f3003087@ds.study.iitm.ac.in",
    "25f3004093@ds.study.iitm.ac.in",
    "25f2007872@ds.study.iitm.ac.in",
    "25f3002937@ds.study.iitm.ac.in",
    "madhushri.personal@gmail.com",
    "peace22308@gmail.com",
    "25f2009174@ds.study.iitm.ac.in",
    "saranv21112007@gmail.com",
    "vibinjenishten@gmail.com",
    "nethraneha0@gmail.com",
    "vajai2008@gmail.com",
    "rishwanthsv17@gmail.com",
    "sjoshua.iit@gmail.com"
  ]

  // Helper to sleep and avoid rate limits (Resend free is 2 req/sec)
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  try {
    let sentCount = 0
    let failCount = 0
    const errors: string[] = []

    for (const email of recipients) {
      try {
        await sendEndTermResultsEmail({
          recipientEmail: email,
        })
        sentCount++
        // Delay 600ms to stay safely under 2 req/sec
        await sleep(600)
      } catch (err: any) {
        console.error(`Failed to send to ${email}:`, err)
        failCount++
        errors.push(`${email}: ${err.message}`)
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Retry Broadcast complete. Sent: ${sentCount}, Failed: ${failCount}`,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error: any) {
    console.error("[send-end-term-email] Error:", error)
    return NextResponse.json(
      { success: false, error: error?.message ?? "Unknown error" },
      { status: 500 }
    )
  }
}
