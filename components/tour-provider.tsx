"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

function waitForEl(id: string, cb: () => void, maxMs = 8000) {
  const start = Date.now();
  const check = setInterval(() => {
    if (document.getElementById(id)) {
      clearInterval(check);
      cb();
    } else if (Date.now() - start > maxMs) {
      clearInterval(check);
      cb(); // give up waiting, call anyway
    }
  }, 150);
}

export function TourProvider() {
  const router = useRouter();
  const pathname = usePathname();
  const tourStarted = useRef(false);

  useEffect(() => {
    const initTour = async () => {
      const isCompleted = localStorage.getItem("bsprep_tour_completed");
      if (isCompleted === "true" || tourStarted.current) return;

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || pathname !== "/dashboard") return;

      tourStarted.current = true;

      waitForEl("tour-dashboard-welcome", () => {
        const driverObj = driver({
          showProgress: true,
          allowClose: true,
          doneBtnText: "FINISH TOUR",
          nextBtnText: "NEXT →",
          prevBtnText: "← PREV",
          onDestroyStarted: () => {
            if (
              !driverObj.hasNextStep() ||
              confirm("Are you sure you want to skip the tour?")
            ) {
              localStorage.setItem("bsprep_tour_completed", "true");
              driverObj.destroy();
            }
          },
          popoverClass: "driverjs-theme-premium",
          steps: [
            // 1 — Dashboard welcome banner (full-width)
            {
              element: "#tour-dashboard-welcome",
              popover: {
                title: "WELCOME TO BSPREP",
                description: "Your all-in-one platform for acing the IITM BS degree. This is your personal dashboard — let us show you around!",
                side: "bottom",
                align: "start",
              },
            },
            // 2 — Dashboard overview (live classes + courses section)
            {
              element: "#tour-dashboard-live",
              popover: {
                title: "YOUR DASHBOARD",
                description: "Upcoming live sessions appear here so you never miss a class. Below, you'll see all your enrolled courses.",
                side: "bottom",
                align: "start",
              },
            },
            // 3 — Navigate to Courses page → highlight ENTIRE courses page
            {
              element: "#tour-sidebar-courses",
              popover: {
                title: "COURSES",
                description: "Click NEXT to explore the full courses catalog — all IITM BS qualifier & foundation courses.",
                side: "right",
                align: "start",
                onNextClick: () => {
                  router.push("/dashboard/courses");
                  waitForEl("tour-courses-page", () => driverObj.moveNext());
                },
              },
            },
            // 4 — Full courses page highlighted
            {
              element: "#tour-courses-page",
              popover: {
                title: "EXPLORE COURSES",
                description: "Browse the full catalog of IITM BS courses. Each card shows the price, duration, and your enrollment status. Click any to learn more!",
                side: "right",
                align: "start",
                onNextClick: () => {
                  router.push("/dashboard/live-classes");
                  waitForEl("tour-live-classes-page", () => driverObj.moveNext());
                },
              },
            },
            // 5 — Full live classes page highlighted
            {
              element: "#tour-live-classes-page",
              popover: {
                title: "LIVE CLASSES",
                description: "View the full schedule of live Zoom classes, filter by status, and watch recordings of past sessions — all from here.",
                side: "right",
                align: "start",
                onNextClick: () => {
                  router.push("/dashboard/tools/gpa-calculator");
                  waitForEl("tour-gpa-calc-page", () => driverObj.moveNext());
                },
              },
            },
            // 6 — Full GPA Calculator page highlighted
            {
              element: "#tour-gpa-calc-page",
              popover: {
                title: "GPA CALCULATOR",
                description: "Calculate your exact course grade or your full semester GPA with precision. Switch between the two modes using the tabs.",
                side: "right",
                align: "start",
                onNextClick: () => {
                  router.push("/dashboard/tools/gpa-predictor");
                  waitForEl("tour-gpa-predictor-page", () => driverObj.moveNext());
                },
              },
            },
            // 7 — Full GPA Predictor page highlighted
            {
              element: "#tour-gpa-predictor-page",
              popover: {
                title: "GPA PREDICTOR",
                description: "Enter your current marks and see exactly what final exam score you need to hit your target grade.",
                side: "right",
                align: "start",
                onNextClick: () => {
                  router.push("/dashboard/resources");
                  waitForEl("tour-resources", () => driverObj.moveNext());
                },
              },
            },
            // 8 — Full Resources page highlighted
            {
              element: "#tour-resources",
              popover: {
                title: "RESOURCES & NOTES",
                description: "Community-driven study materials organized by subject. Browse approved notes or contribute your own for fellow students!",
                side: "right",
                align: "start",
                onNextClick: () => {
                  router.push("/dashboard/notifications");
                  waitForEl("tour-notifications", () => driverObj.moveNext());
                },
              },
            },
            // 9 — Full Notifications page highlighted
            {
              element: "#tour-notifications",
              popover: {
                title: "NOTIFICATIONS",
                description: "Stay updated with new live classes, admin announcements, and mentor replies — all in one place.",
                side: "right",
                align: "start",
                onNextClick: () => {
                  router.push("/dashboard");
                  waitForEl("tour-sidebar-quizprep", () => driverObj.moveNext());
                },
              },
            },
            // 10 — Quiz Prep (sidebar, coming soon)
            {
              element: "#tour-sidebar-quizprep",
              popover: {
                title: "QUIZ PREP — COMING SOON",
                description: "Chapter-wise practice questions, mock tests, and performance analytics to help you crush your IITM BS exams. Launching soon!",
                side: "right",
                align: "start",
              },
            },
            // 11 — Doubts (sidebar, coming soon)
            {
              element: "#tour-sidebar-doubts",
              popover: {
                title: "DOUBTS — COMING SOON",
                description: "Submit questions directly to mentors and get detailed answers fast. The Doubts section is on its way!",
                side: "right",
                align: "start",
              },
            },
            // 12 — Settings
            {
              element: "#tour-sidebar-settings",
              popover: {
                title: "SETTINGS",
                description: "Update your profile, change your password, and manage your account from here. That's the full tour — you're all set!",
                side: "right",
                align: "start",
                onNextClick: () => {
                  localStorage.setItem("bsprep_tour_completed", "true");
                  driverObj.moveNext();
                },
              },
            },
          ],
        });

        driverObj.drive();
      });
    };

    initTour();
  }, [pathname, router]);

  return null;
}

