import Link from "next/link"
import { createClient, createServiceRoleClient } from "@/lib/supabase/server"
import { getMentorSubjectCourseIds } from "@/lib/chat/server"

type MentorProfileRow = {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  avatar_url: string | null
  mentor_subject: string | null
  mentor_subjects: string[] | null
}

async function getCommunityStudents(service: ReturnType<typeof createServiceRoleClient>, mentorId: string, courseIds: string[]) {
  if (courseIds.length === 0) {
    return []
  }

  const enrollmentColumns: Array<"user_id" | "student_id"> = ["user_id", "student_id"]
  let enrolledIds: string[] = []

  for (const column of enrollmentColumns) {
    const { data, error } = await service.from("enrollments").select(`${column}, course_id`).in("course_id", courseIds)

    if (error) {
      continue
    }

    const ids = Array.from(
      new Set(
        ((data ?? []) as Array<Record<string, unknown>>)
          .map((row) => String(row[column] ?? ""))
          .filter((value) => value && value !== mentorId),
      ),
    )

    enrolledIds = ids
    break
  }

  if (enrolledIds.length === 0) {
    const { data: directChats } = await service
      .from("mentor_direct_chats")
      .select("student_id")
      .eq("mentor_id", mentorId)

    enrolledIds = Array.from(new Set((directChats ?? []).map((row) => String(row.student_id ?? "")).filter(Boolean)))
  }

  if (enrolledIds.length === 0) {
    return []
  }

  const { data: profiles, error: profilesError } = await service
    .from("profiles")
    .select("id, role, first_name, last_name, email, avatar_url")
    .in("id", enrolledIds)

  if (profilesError || !profiles) {
    return []
  }

  return profiles.filter((profile) => {
    const normalizedRole = String(profile.role ?? "student").toLowerCase()
    return normalizedRole !== "admin" && normalizedRole !== "mentor"
  })
}

export default async function MentorDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const service = createServiceRoleClient()
  const { data: profile } = await service
    .from("profiles")
    .select("id, first_name, last_name, email, avatar_url, mentor_subject, mentor_subjects")
    .eq("id", user.id)
    .maybeSingle()

  const mentorProfile = (profile ?? null) as MentorProfileRow | null
  const mentorCourseIds = getMentorSubjectCourseIds(mentorProfile)

  const mentorName =
    `${mentorProfile?.first_name ?? ""} ${mentorProfile?.last_name ?? ""}`.trim() ||
    (typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "") ||
    "Mentor"

  const mentorEmail = mentorProfile?.email || user.email || ""
  const mentorAvatar =
    mentorProfile?.avatar_url ||
    (typeof user.user_metadata?.avatar_url === "string" ? user.user_metadata.avatar_url : null) ||
    (typeof user.user_metadata?.picture === "string" ? user.user_metadata.picture : null)

  const communityStudents = await getCommunityStudents(service, user.id, mentorCourseIds)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-100">Welcome, {mentorName}</h1>
        <p className="mt-1 text-sm text-emerald-100/70">Your mentor dashboard overview</p>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-[#102329] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/60">Profile</p>
          <div className="mt-4 flex items-center gap-4">
            {mentorAvatar ? (
              <img
                src={mentorAvatar}
                alt="Mentor avatar"
                className="h-16 w-16 rounded-full border border-white/15 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-[#1a3741] text-lg font-semibold text-emerald-100">
                {(mentorName.trim()[0] || "M").toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-emerald-50">{mentorName}</p>
              <p className="truncate text-sm text-emerald-100/75">{mentorEmail}</p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-[#102329] p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-100/60">Community</p>
          <p className="mt-3 text-3xl font-bold text-emerald-200">{communityStudents.length}</p>
          <p className="mt-1 text-sm text-emerald-100/75">Students in your community</p>
          <p className="mt-3 text-xs text-emerald-100/60">Based on your assigned subject groups and active direct chats.</p>
        </article>
      </section>

      {/* Community Students List */}
      <section className="rounded-2xl border border-white/10 bg-[#102329] p-5">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-emerald-100/60">Your Students</p>
        {communityStudents.length === 0 ? (
          <p className="text-sm text-emerald-100/70">No students enrolled in your subject yet.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {communityStudents.map((student) => {
              const fullName = `${student.first_name || ""} ${student.last_name || ""}`.trim() || "Student"
              const initials = (student.first_name?.[0] || student.email?.[0] || "S").toUpperCase()
              return (
                <div key={student.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#152a33] p-3">
                  {student.avatar_url ? (
                    <img
                      src={student.avatar_url}
                      alt={fullName}
                      className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1a3741] text-sm font-semibold text-emerald-100">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-emerald-50">{fullName}</p>
                    <p className="truncate text-xs text-emerald-100/70">{student.email}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
