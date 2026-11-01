"use client"

import { useEffect, useState } from "react"
import { BarChart3, ChevronDown, ChevronUp, Sparkles, AlertCircle } from "lucide-react"
import { Card } from "@/components/dashboard/ui"
import type { CourseTopicAnalysis } from "@/lib/quiz/topics"

export function TopicBreakdownCard({ subjectId }: { subjectId: string }) {
  const [data, setData] = useState<CourseTopicAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`/api/quiz/topics?subject=${encodeURIComponent(subjectId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found")
        return res.json()
      })
      .then((json: CourseTopicAnalysis) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setData(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [subjectId])

  if (loading || !data || data.topics.length === 0) return null

  const displayTopics = expanded ? data.topics : data.topics.slice(0, 4)

  return (
    <Card className="border-primary/20 bg-primary/[0.02]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight">Most Repeated PYQ Topics</h3>
            <p className="text-xs text-muted-foreground">
              Based on historical paper frequency analysis for this course
            </p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="size-3.5" />
            </>
          ) : (
            <>
              View all {data.topics.length} topics <ChevronDown className="size-3.5" />
            </>
          )}
        </button>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {displayTopics.map((item) => (
          <div
            key={item.topic}
            className="flex flex-col justify-between rounded-xl border bg-card p-3.5 text-xs transition-colors hover:border-primary/30"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-foreground">
                <span className="mr-1.5 inline-block text-[10px] font-bold text-muted-foreground">
                  #{item.rank}
                </span>
                {item.topic}
              </span>
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 font-bold text-primary text-[11px]">
                {item.share}
              </span>
            </div>
            {item.whatTheyAsk && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                {item.whatTheyAsk}
              </p>
            )}
          </div>
        ))}
      </div>

      {expanded && data.patterns.length > 0 && (
        <div className="mt-5 border-t pt-4">
          <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <BarChart3 className="size-3.5 text-primary" /> Recurring Question Patterns
          </h4>
          <div className="mt-3 space-y-2">
            {data.patterns.slice(0, 5).map((pattern, idx) => (
              <div key={idx} className="rounded-lg bg-muted/50 p-2.5 text-xs">
                <div className="flex items-center justify-between gap-2 font-semibold text-foreground">
                  <span>{pattern.questionType}</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    Asked in {pattern.papersCount} papers
                  </span>
                </div>
                {pattern.askedIn && (
                  <p className="mt-1 text-[11px] text-muted-foreground truncate">
                    {pattern.askedIn}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

