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
        <div style="margin: 24px 0 0 0;">
          <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280;">Your enrolled courses</p>
          ${safeCourses.map((course) => `
            <div style="margin: 0 0 12px 0; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; background: #ffffff;">
              ${course.thumbnailUrl ? `<img src="${course.thumbnailUrl}" alt="${course.title}" style="display: block; width: 100%; max-height: 180px; object-fit: cover; border: 0;" />` : ""}
              <div style="padding: 12px 14px;">
                <p style="margin: 0; font-size: 15px; font-weight: 700; color: #111827;">${course.title}</p>
              </div>
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
      <div style="margin: 0; padding: 24px 12px; background: #f3f4f6;">
        <div style="max-width: 700px; margin: 0 auto; font-family: 'Space Grotesk', 'Inter', Arial, sans-serif; color: #111827;">
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 26px rgba(17, 24, 39, 0.08);">
            <div style="padding: 26px 28px; background: linear-gradient(135deg, #0f172a 0%, #111827 60%, #1f2937 100%);">
              <img src="${logoUrl}" alt="BSPrep" width="120" style="display: block; border: 0; border-radius: 8px; margin-bottom: 14px;" />
              <p style="margin: 0 0 8px 0; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #86efac;">Enrollment confirmed</p>
              <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 32px; line-height: 1.15; letter-spacing: -0.03em;">Welcome to BSPrep</h1>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 17px; line-height: 1.65;">Hi ${studentName}, your payment is complete and you are now enrolled in ${courseSummary}.</p>
            </div>

            <div style="padding: 26px 28px;">
              <p style="margin: 0 0 14px 0; font-size: 16px; line-height: 1.75; color: #1f2937;">Your learning dashboard is ready with full access to your enrolled course content.</p>

              <div style="margin: 0 0 18px 0; border: 1px solid #e5e7eb; border-radius: 14px; padding: 16px 18px; background: #f9fafb;">
                <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Next steps</p>
                <ol style="margin: 0; padding: 0 0 0 18px; color: #374151; line-height: 1.75; font-size: 14px;">
                  <li>Open your dashboard and start your first lesson.</li>
                  <li>Follow your weekly plan and track progress consistently.</li>
                  <li>Use BSPrep resources and practice sessions to stay ahead.</li>
                </ol>
              </div>

              ${courseCardsHtml}

              <div style="text-align: center; margin: 24px 0 0 0;">
                <a href="${dashboardUrl}" style="display: inline-block; background: #111827; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 13px 24px; border-radius: 999px;">Go to your dashboard</a>
              </div>

              <p style="margin: 20px 0 0 0; font-size: 14px; line-height: 1.7; color: #6b7280;">If you are not signed in, log in with <strong style="color: #111827;">${studentEmail}</strong> and continue from your dashboard.</p>
            </div>
          </div>

          <p style="margin: 14px 0 0 0; text-align: center; font-size: 12px; color: #6b7280;">BSPrep Team · Structured learning for IITM BS students.</p>
        </div>
      </div>
    `,
  })
}