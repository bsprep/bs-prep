type CourseWelcomeEmailInput = {
  studentName: string
  studentEmail: string
  courses?: Array<{
    title: string
    thumbnailUrl?: string | null
  }>
  courseTitles?: string[]
  dashboardUrl?: string
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
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function joinCourseTitles(courseTitles: string[]): string {
  if (courseTitles.length === 0) {
    return "your course"
  }

  if (courseTitles.length === 1) {
    return courseTitles[0]
  }

  if (courseTitles.length === 2) {
    return `${courseTitles[0]} and ${courseTitles[1]}`
  }

  return `${courseTitles.slice(0, -1).join(", ")}, and ${courseTitles[courseTitles.length - 1]}`
}

function normalizeCourses(input: CourseWelcomeEmailInput): Array<{ title: string; thumbnailUrl: string | null }> {
  const fromCourses = (input.courses ?? [])
    .map((course) => ({
      title: course.title.trim(),
      thumbnailUrl: course.thumbnailUrl ? course.thumbnailUrl.trim() : null,
    }))
    .filter((course) => course.title.length > 0)

  if (fromCourses.length > 0) {
    return fromCourses
  }

  return (input.courseTitles ?? [])
    .map((title) => title.trim())
    .filter((title) => title.length > 0)
    .map((title) => ({ title, thumbnailUrl: null }))
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

export async function sendCourseWelcomeEmail(input: CourseWelcomeEmailInput): Promise<void> {
  const from = process.env.COURSE_EMAIL_FROM || process.env.ANNOUNCEMENT_EMAIL_FROM || process.env.DONATION_EMAIL_FROM
  if (!from) {
    throw new Error("Course enrollment email sender is not configured")
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bsprep.in"
  const dashboardUrl = input.dashboardUrl || new URL("/dashboard", siteUrl).toString()
  const logoUrl = new URL("/new-logo.jpeg", siteUrl).toString()
  const studentName = escapeHtml(input.studentName || "there")
  const studentEmail = escapeHtml(input.studentEmail)
  const normalizedCourses = normalizeCourses(input)
  const safeCourses = normalizedCourses.map((course) => ({
    title: escapeHtml(course.title),
    thumbnailUrl: course.thumbnailUrl ? escapeHtml(course.thumbnailUrl) : null,
  }))
  const courseTitles = safeCourses.map((course) => course.title)

  const mainCourseTitle = courseTitles[0] || "your course"
  const courseSummary = joinCourseTitles(courseTitles)
  const courseCardsHtml = safeCourses.length > 0
    ? `
        <div style="margin: 24px 0;">
          <p style="font-weight: 700; margin-bottom: 16px; font-size: 15px; color: #0f172a;">Your Enrolled Courses:</p>
          ${safeCourses.map((course) => `
            <div style="margin-bottom: 12px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  ${course.thumbnailUrl ? `<td width="100" valign="middle"><img src="${course.thumbnailUrl}" alt="${course.title}" width="84" style="border-radius: 6px; display: block;" /></td>` : ""}
                  <td valign="middle">
                    <p style="margin: 0; font-weight: 600; font-size: 15px; color: #0f172a;">${course.title}</p>
                  </td>
                </tr>
              </table>
            </div>
          `).join("")}
        </div>
      `
    : ""

  await sendWithResend({
    from,
    to: [input.studentEmail],
    subject: courseTitles.length > 1
      ? "Your BSPrep enrollment is confirmed"
      : `Welcome to ${mainCourseTitle} at BSPrep`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 40px 20px; background-color: #f1f5f9; font-family: 'Sora', Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <div style="padding: 24px 32px; border-bottom: 1px solid #e2e8f0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="middle">
                      <img src="${logoUrl}" width="40" height="40" style="border-radius: 50%; display: block; margin-right: 12px; object-fit: cover;" />
                    </td>
                    <td valign="middle">
                      <span style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: #0f172a;">BSPrep</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Hero Image -->
              <img src="${new URL('/og-image.png', siteUrl).toString()}" alt="Enrollment Confirmed" width="600" style="display: block; width: 100%; max-width: 600px; height: auto;" />

              <!-- Content -->
              <div style="padding: 32px;">
                <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a;">Welcome, ${studentName}!</h1>
                <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                    Your payment is complete and you are now officially enrolled in <strong>${courseSummary}</strong>. Get ready to showcase your skills and unlock an exciting chapter!
                </p>

                <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #0f172a;">What Happens Next?</h2>
                <ul style="margin: 0 0 32px 0; padding: 0 0 0 20px; color: #475569; font-size: 15px; line-height: 1.6;">
                    <li style="margin-bottom: 8px;">Access your personalized dashboard immediately.</li>
                    <li style="margin-bottom: 8px;">Find your video lectures and course tasks inside.</li>
                    <li style="margin-bottom: 8px;">Complete the assigned tasks to move forward.</li>
                </ul>

                ${courseCardsHtml}

                <div style="text-align: center; margin-top: 32px;">
                    <a href="${dashboardUrl}" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600;">Go to Dashboard</a>
                </div>
                
                <p style="margin: 32px 0 0 0; font-size: 14px; line-height: 1.6; color: #64748b; text-align: center;">
                    If you have any queries, reach out to us at <a href="mailto:hello@bsprep.in" style="color: #2563eb; text-decoration: none; font-weight: 600;">hello@bsprep.in</a>.
                </p>
              </div>

          </div>
          
          <div style="text-align: center; margin-top: 24px;">
              <p style="font-size: 12px; color: #94a3b8;">&copy; 2026 BSPrep. All rights reserved.</p>
          </div>
      </body>
      </html>
    `,
  })
}