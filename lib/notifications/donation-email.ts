type DonationThankYouInput = {
  donorName: string
  donorEmail: string
  amount: number
  upiReferenceId?: string
}

type ResendEmailPayload = {
  from: string
  to: string[]
  subject: string
  html: string
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

async function sendWithResend(payload: ResendEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const responseText = await res.text()
    throw new Error(`Resend API failed: ${res.status} ${responseText}`)
  }
}

export async function sendDonationThankYouEmail(input: DonationThankYouInput): Promise<void> {
  const from = process.env.DONATION_EMAIL_FROM || process.env.ANNOUNCEMENT_EMAIL_FROM
  if (!from) {
    return
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bsprep.in"
  const logoUrl = new URL("/new-logo.jpeg", siteUrl).toString()
  const supportUrl = new URL("/support", siteUrl).toString()
  const donorName = escapeHtml(input.donorName)
  const donorEmail = escapeHtml(input.donorEmail)
  const upiReferenceId = input.upiReferenceId ? escapeHtml(input.upiReferenceId) : null
  const amount = Number.isFinite(input.amount) ? input.amount.toFixed(2) : "0.00"

  await sendWithResend({
    from,
    to: [input.donorEmail],
    subject: "Thank You for Supporting BSPREP",
    html: `
      <div style="margin: 0; padding: 24px 12px; background: #f3f4f6;">
        <div style="max-width: 680px; margin: 0 auto; font-family: 'Space Grotesk', 'Inter', Arial, sans-serif; color: #111827;">
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 24px rgba(17, 24, 39, 0.08);">
            <div style="padding: 26px 28px; background: linear-gradient(135deg, #0f172a 0%, #111827 60%, #1f2937 100%);">
              <img src="${logoUrl}" alt="BSPrep" width="120" style="display: block; border: 0; border-radius: 8px; margin-bottom: 14px;" />
              <p style="margin: 0 0 8px 0; color: #86efac; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;">Contribution received</p>
              <h2 style="margin: 0; color: #ffffff; font-size: 28px; line-height: 1.2; letter-spacing: -0.02em;">Thank you for supporting BSPrep</h2>
            </div>

            <div style="padding: 26px 28px;">
              <p style="margin: 0 0 12px 0; font-size: 16px; line-height: 1.75;">Hi ${donorName}, we have successfully received your contribution. Your support helps us build better learning experiences for IITM BS students.</p>

              <div style="margin: 18px 0; border: 1px solid #e5e7eb; border-radius: 14px; padding: 16px 18px; background: #f9fafb;">
                <p style="margin: 0 0 10px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700;">Transaction summary</p>
                <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Donor:</strong> ${donorName}</p>
                <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Email:</strong> ${donorEmail}</p>
                <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>Amount:</strong> INR ${amount}</p>
                ${upiReferenceId ? `<p style="margin: 0; font-size: 14px;"><strong>UPI Reference:</strong> ${upiReferenceId}</p>` : ""}
              </div>

              <p style="margin: 0 0 14px 0; font-size: 15px; line-height: 1.7; color: #374151;">Every contribution directly supports platform quality, student-first resources, and ongoing improvements.</p>

              <div style="margin-top: 20px; text-align: center;">
                <a href="${supportUrl}" style="display: inline-block; background: #111827; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 999px; font-size: 14px; font-weight: 700;">Contact BSPrep Team</a>
              </div>
            </div>
          </div>

          <p style="text-align: center; margin: 14px 0 0 0; color: #6b7280; font-size: 12px;">BSPrep Team · Thank you for believing in consistent, high-quality learning.</p>
        </div>
      </div>
    `,
  })
}
