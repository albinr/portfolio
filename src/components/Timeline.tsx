"use client";

import { useMemo, useState } from "react";

export type TimelineItem = {
  id: string;
  date: Date;
  title: string;
  type: "education" | "project";
  description: string;
};

const timelineData: TimelineItem[] = [
  {
    id: "bth-start",
    date: new Date(2022, 7, 20),
    title: "Started BSc Web Programming at BTH",
    type: "education",
    description:
      "Began a 3-year Bachelor's program focused on full-stack web development, modern frameworks, and agile workflows.",
  },
  {
    id: "kyh-start",
    date: new Date(2020, 7, 17),
    title: "Started Frontend Development at KYH",
    type: "education",
    description:
      "Began a 2-year Higher Vocational Education program in Frontend Development.",
  },
  {
    id: "c2-security-app",
    date: new Date(2023, 4, 30),
    title: "C2 Security Application Project",
    type: "project",
    description:
      "Built a Command and Control app with a Python/Quart backend and a Tkinter/WebSocket-based client.",
  },
  {
    id: "studentpoolen-dashboard",
    date: new Date(2023, 10, 15),
    title: "Studentpoolen Project – Admin Dashboard",
    type: "project",
    description:
      "Created a modern admin interface with Next.js, Tailwind, and TypeScript, integrated with a Spring Boot backend and Auth0 roles.",
  },
  {
    id: "stonkbot-start",
    date: new Date(2024, 5, 1),
    title: "Started AI Trading Bot (Stonkbot)",
    type: "project",
    description:
      "Started a personal summer project to build a reinforcement learning-based trading bot using Python and Flask.",
  },
];

const filters = ["all", "education", "project"] as const;
type Filter = (typeof filters)[number];

export default function Timeline() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const items =
      filter === "all"
        ? timelineData
        : timelineData.filter((item) => item.type === filter);

    return [...items].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [filter]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <section className="w-full">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-[var(--foreground)]/50">
          Timeline
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          My Journey
        </h2>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((type) => {
          const active = filter === type;

          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                  : "border-black/10 bg-[var(--background)] text-[var(--foreground)]/75 hover:border-black/20 hover:bg-black/[0.03] hover:text-[var(--foreground)] dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/[0.04]"
              }`}
              aria-pressed={active}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          );
        })}
      </div>

      <div className="relative pl-6 sm:pl-8">
        <div className="absolute left-2 top-0 h-full w-px bg-black/10 dark:bg-white/10" />

        <div className="space-y-6">
          {filtered.map((item) => (
            <article key={item.id} className="relative">
              <span
                className={`absolute -left-[1.1rem] top-7 h-3.5 w-3.5 rounded-full border-2 border-[var(--background)] ${
                  item.type === "education"
                    ? "bg-[var(--foreground)]"
                    : "bg-transparent border-[var(--foreground)]"
                }`}
              />

              <div className="rounded-2xl border border-black/10 bg-[var(--background)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-[var(--foreground)]/55">
                    {formatDate(item.date)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.type === "education"
                        ? "bg-[var(--foreground)]/8 text-[var(--foreground)]"
                        : "bg-black/[0.05] text-[var(--foreground)]/75 dark:bg-white/[0.06]"
                    }`}
                  >
                    {item.type === "education" ? "Education" : "Project"}
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)] sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-[var(--foreground)]/72">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}