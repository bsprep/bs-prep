"use client"

import { useState } from "react"
import { RECOMMENDED_RESOURCES, type RecommendedResource } from "@/data/curated-resources"
import { ExternalLink, BookOpen, Video, FileSpreadsheet, Globe, Sparkles, Filter } from "lucide-react"
import { Card } from "@/components/dashboard/ui"
import { cn } from "@/lib/utils"

const ICONS: Record<string, React.ElementType> = {
  Channel: Video,
  Video: Video,
  Book: BookOpen,
  Course: Globe,
  Sheet: FileSpreadsheet,
  Website: Globe,
  Link: Globe,
  Notes: BookOpen,
}

export function DashboardCuratedResources() {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const categories = ["All", "Foundation", "Diploma", "Advanced Books & AI"] as const

  const filtered = activeCategory === "All"
    ? RECOMMENDED_RESOURCES
    : RECOMMENDED_RESOURCES.filter((r) => r.category === activeCategory)

  return (
    <div className="mt-10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#0a192f]/5 text-[#0a192f] ring-1 ring-black/5">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-foreground">
              Curated Study Resources
            </h2>
            <p className="text-xs font-semibold text-muted-foreground">
              High-yield YouTube channels, industry textbooks, and AI/ML courses
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-muted/40 rounded-2xl border border-black/5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-xl px-3.5 py-1.5 text-xs font-black uppercase tracking-wider transition-all",
                activeCategory === cat
                  ? "bg-[#0a192f] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const Icon = ICONS[item.type] || Globe
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl border bg-card p-4 shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#0a192f]/30"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0a192f]/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#0a192f]">
                    <Icon className="size-3 text-[#0a192f]" />
                    {item.type}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {item.subject}
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-black uppercase tracking-tight text-foreground line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs font-medium text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-2.5 text-xs font-bold text-[#0a192f]">
                <span>Explore Resource</span>
                <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

