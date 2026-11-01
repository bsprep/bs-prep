import { NextResponse } from "next/server"
import { getAllTopicSlugs, getTopicAnalysis } from "@/lib/quiz/topics"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subject = searchParams.get("subject")

  if (subject) {
    const analysis = getTopicAnalysis(subject)
    if (!analysis) {
      return NextResponse.json({ error: "Topic analysis not found for subject" }, { status: 404 })
    }
    return NextResponse.json(analysis)
  }

  // List all available subjects with topic analyses
  const slugs = getAllTopicSlugs()
  const list = slugs
    .map((slug) => {
      const data = getTopicAnalysis(slug)
      if (!data) return null
      return {
        slug: data.slug,
        courseName: data.courseName,
        topicsCount: data.topics.length,
        patternsCount: data.patterns.length,
      }
    })
    .filter(Boolean)

  return NextResponse.json({ subjects: list })
}

