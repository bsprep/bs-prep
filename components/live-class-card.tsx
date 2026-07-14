"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Youtube } from "lucide-react";

const COURSE_DISPLAY_NAMES: Record<string, string> = {
  ct: "Computational Thinking",
  "math-1": "Mathematics for Data Science I",
  "stats-1": "Statistics I",
  "python": "Programming in Python",
  "math-2": "Mathematics for Data Science II",
  "stats-2": "Statistics II",
  "english-1": "English I",
  "english-2": "English II",
  "doubts": "Doubt Session",
};

function getCourseDisplayName(code: string): string {
  return COURSE_DISPLAY_NAMES[code.toLowerCase()] ?? code;
}

function formatTime12hr(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr ?? "00";
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${period}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

interface LiveClassCardProps {
  course: string;
  topic: string;
  meetingLink: string;
  time: string;
  date: string;
  youtubeLink?: string;
}

export function LiveClassCard({
  course,
  topic,
  meetingLink,
  time,
  date,
  youtubeLink,
}: LiveClassCardProps) {
  const getStatus = (): "live" | "upcoming" | "completed" => {
    const now = new Date();
    const classDate = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    classDate.setHours(hours, minutes, 0, 0);
    const diffMins = Math.floor((classDate.getTime() - now.getTime()) / 60000);
    if (diffMins < -60) return "completed";
    if (diffMins <= 15 && diffMins >= -60) return "live";
    return "upcoming";
  };

  const status = getStatus();

  const statusBadge = {
    live: "bg-red-50 text-red-600 border border-red-200",
    upcoming: "bg-blue-50 text-blue-700 border border-blue-200",
    completed: "bg-black/5 text-black border border-black/10",
  };

  const statusLabel = {
    live: "LIVE",
    upcoming: "UPCOMING",
    completed: "COMPLETED",
  };

  return (
    <div className="bg-white border border-black/10 hover:border-black hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden flex flex-col group group/card h-full">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 ${statusBadge[status]}`}>
            {status === "live" && <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>}
            {statusLabel[status]}
          </span>
          <Calendar className="w-4 h-4 text-black/30" />
        </div>
        
        <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">{getCourseDisplayName(course)}</p>
        <h3 className="font-black text-black uppercase tracking-tight text-xl leading-[1.2] mb-6 flex-1">
          {topic}
        </h3>
        
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black/60 pt-6 border-t border-black/5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-black/40" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-black/40" />
            <span>{formatTime12hr(time)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-black/5 group-hover/card:bg-black transition-colors">
        {status === "completed" ? (
          youtubeLink ? (
            <button
              onClick={() => window.open(youtubeLink, "_blank")}
              className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 group-hover/card:text-red-400 py-3 transition-colors"
            >
              <Youtube className="w-4 h-4" />
              WATCH RECORDING
            </button>
          ) : (
            <button disabled className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-black/30 py-3 cursor-not-allowed">
              <Video className="w-4 h-4" />
              NO RECORDING
            </button>
          )
        ) : (
          <button
            onClick={() => window.open(meetingLink, "_blank")}
            disabled={!meetingLink}
            className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-black group-hover/card:text-white py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Video className="w-4 h-4" />
            {status === "live" ? "JOIN NOW" : "JOIN MEETING"}
          </button>
        )}
      </div>
    </div>
  );
}
