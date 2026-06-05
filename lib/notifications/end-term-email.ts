type EndTermEmailInput = {
  recipientEmail: string
  recipientName?: string
}

type ResendEmailPayload = {
  from: string
  to: string[]
  subject: string
  html: string
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

export async function sendEndTermResultsEmail(input: EndTermEmailInput): Promise<void> {
  const from =
    process.env.ANNOUNCEMENT_EMAIL_FROM ||
    process.env.COURSE_EMAIL_FROM ||
    process.env.DONATION_EMAIL_FROM

  if (!from) {
    throw new Error("Email sender is not configured. Set ANNOUNCEMENT_EMAIL_FROM in .env.local")
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bsprep.in"
  const logoUrl = new URL("/new-logo-favicon.png", siteUrl).toString()
  const ogImageUrl = new URL("/og-image.png", siteUrl).toString()
  const recipientName = input.recipientName || "there"

  await sendWithResend({
    from,
    to: [input.recipientEmail],
    subject: "Your End Term Results Are Now Available",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>End Term Results</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 36px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; border: 1px solid #e4e4e7; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">

          <!-- Header: Logo -->
          <tr>
            <td style="padding: 24px 36px; border-bottom: 1px solid #f4f4f5;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle; padding-right: 12px;">
                    <img src="${logoUrl}" alt="BSPrep" width="40" height="40" style="display: block; border-radius: 6px;" />
                  </td>
                  <td style="vertical-align: middle;">
                    <span style="font-size: 20px; font-weight: 800; color: #09090b; letter-spacing: -0.01em;">BSPrep</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 36px 28px;">

              <!-- Greeting -->
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #71717a; letter-spacing: 0.06em; text-transform: uppercase;">Results Update</p>
              <h1 style="margin: 0 0 16px 0; font-size: 26px; font-weight: 800; color: #09090b; line-height: 1.25; letter-spacing: -0.02em;">
                Your end term results are out.
              </h1>
              <p style="margin: 0 0 32px 0; font-size: 15px; color: #52525b; line-height: 1.75;">
                Hi ${recipientName}, the end term exam results for the January 2026 term have been published. 
                You can now check your subject-wise scores and calculate your final grade — all in one place.
              </p>

              <!-- Divider -->
              <hr style="border: none; border-top: 1px solid #f4f4f5; margin: 0 0 28px 0;" />

              <!-- Link 1: Score Checker -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 14px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.1em; text-transform: uppercase;">Score Checker</p>
                    <a href="https://score-checker-379619009600.asia-south1.run.app/course_wise"
                       style="display: block; padding: 15px 22px; background-color: #09090b; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; letter-spacing: 0.01em;">
                      View Your Subject-wise Scores
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Link 2: GPA Calculator -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.1em; text-transform: uppercase;">GPA Calculator</p>
                    <a href="https://bsprep.in/tools/gpa-calculator"
                       style="display: block; padding: 15px 22px; background-color: #ffffff; color: #09090b; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; border: 1.5px solid #d4d4d8; letter-spacing: 0.01em;">
                      Calculate Your SGPA and CGPA
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- OG Banner: Join for May Term -->
          <tr>
            <td style="padding: 0 36px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius: 10px; overflow: hidden; border: 1px solid #e4e4e7;">
                <tr>
                  <td>
                    <img src="${ogImageUrl}" alt="BSPrep — Join for May Term" width="100%" style="display: block; border-radius: 10px 10px 0 0;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px; background: #09090b; border-radius: 0 0 10px 10px;">
                    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #ffffff; line-height: 1.4;">
                      Preparing for the May 2026 term?
                    </p>
                    <p style="margin: 0 0 14px 0; font-size: 13px; color: #a1a1aa; line-height: 1.6;">
                      Join BSPrep and get structured resources, practice sessions, and expert guidance from day one.
                    </p>
                    <a href="${siteUrl}"
                       style="display: inline-block; padding: 10px 20px; background-color: #ffffff; color: #09090b; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 700;">
                      Explore BSPrep
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 36px 24px; border-top: 1px solid #f4f4f5;">
              <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.7;">
                BSPrep &mdash; Structured learning for IITM BS students.<br />
                <a href="${siteUrl}" style="color: #71717a; text-decoration: none;">bsprep.in</a> &nbsp;&middot;&nbsp;
                You are receiving this because you are registered on BSPrep.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `,
  })
}
