import fs from "fs"
import path from "path"

export interface TopicItem {
  rank: number
  topic: string
  questions: number
  share: string
  whatTheyAsk: string
}

export interface QuestionPattern {
  questionType: string
  papersCount: number
  askedIn: string
}

export interface CourseTopicAnalysis {
  slug: string
  courseName: string
  subtitle: string
  topics: TopicItem[]
  patterns: QuestionPattern[]
}

const TOPICS_DIR = path.join(process.cwd(), "data", "pyq-topics")

// Helper mapping between app course IDs / names and topic markdown file slugs
const SLUG_ALIASES: Record<string, string> = {
  python: "programming-in-python",
  maths1: "mathematics-for-data-science-1",
  maths2: "mathematics-for-data-science-2",
  stats1: "statistics-for-data-science-1",
  stats2: "statistics-for-data-science-2",
  ct: "computational-thinking",
  english1: "english-1",
  english2: "english-2",
  pdsa: "programming-data-structures-and-algorithms",
  dbms: "database-management-systems",
  appdev1: "modern-application-development-1",
  appdev2: "modern-application-development-2",
  java: "programming-in-java",
  system_commands: "system-commands",
  mlf: "machine-learning-foundations",
  mlt: "machine-learning-techniques",
  mlp: "machine-learning-practice",
  bdm: "business-data-management",
  business_analytics: "business-analytics",
  tds: "tools-in-data-science",
  sw_engg: "software-engineering",
  sw_testing: "software-testing",
}

export function resolveTopicSlug(subjectIdOrSlug: string): string {
  const normalized = subjectIdOrSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  return SLUG_ALIASES[subjectIdOrSlug] || SLUG_ALIASES[normalized] || normalized
}

export function getAllTopicSlugs(): string[] {
  if (!fs.existsSync(TOPICS_DIR)) return []
  return fs
    .readdirSync(TOPICS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getTopicAnalysis(subjectIdentifier: string): CourseTopicAnalysis | null {
  const slug = resolveTopicSlug(subjectIdentifier)
  const filePath = path.join(TOPICS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const content = fs.readFileSync(filePath, "utf-8")
  return parseTopicMarkdown(slug, content)
}

function parseTopicMarkdown(slug: string, content: string): CourseTopicAnalysis {
  const lines = content.split("\n")
  let courseName = slug
  let subtitle = ""
  const topics: TopicItem[] = []
  const patterns: QuestionPattern[] = []

  let inTopicsTable = false
  let inPatternsTable = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Title: # Course Name: most repeated PYQ topics
    if (line.startsWith("# ")) {
      courseName = line.replace(/^#\s*/, "").replace(/:\s*most repeated PYQ topics.*$/i, "").trim()
      continue
    }

    // Subtitle (line right after or near title)
    if (!subtitle && line.startsWith("IIT Madras BS")) {
      subtitle = line
      continue
    }

    if (line.startsWith("## Topics, most asked first")) {
      inTopicsTable = true
      inPatternsTable = false
      continue
    }

    if (line.startsWith("## Question types that come back") || line.startsWith("## Question types")) {
      inTopicsTable = false
      inPatternsTable = true
      continue
    }

    if (line.startsWith("## How this was made") || line.startsWith("---")) {
      inTopicsTable = false
      inPatternsTable = false
      continue
    }

    // Parse Topics Table: | # | Topic | Questions | Share | What they ask |
    if (inTopicsTable && line.startsWith("|") && line.endsWith("|")) {
      const cols = line.split("|").map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      if (cols.length >= 5 && cols[0] !== "#" && !cols[0].includes("---")) {
        const rank = parseInt(cols[0], 10) || topics.length + 1
        const cleanTopic = cols[1].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim()
        const questions = parseInt(cols[2], 10) || 0
        const share = cols[3]
        const whatTheyAsk = cols[4]
        topics.push({ rank, topic: cleanTopic, questions, share, whatTheyAsk })
      }
    }

    // Parse Patterns Table: | Question type | Papers | Asked in |
    if (inPatternsTable && line.startsWith("|") && line.endsWith("|")) {
      const cols = line.split("|").map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      if (cols.length >= 3 && !cols[0].toLowerCase().includes("question type") && !cols[0].includes("---")) {
        const questionType = cols[0]
        const papersCount = parseInt(cols[1], 10) || 0
        const askedIn = cols[2]
        patterns.push({ questionType, papersCount, askedIn })
      }
    }
  }

  return {
    slug,
    courseName,
    subtitle,
    topics,
    patterns,
  }
}

