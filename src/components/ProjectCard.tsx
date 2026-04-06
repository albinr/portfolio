import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  tags?: string[];
  pushed_at: string;
  created_at: string;
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
  homepage?: string;
}

export default function ProjectCard({
  title,
  description,
  url,
  tags = [],
  pushed_at,
  created_at,
  language,
  stargazers_count,
  forks_count,
  homepage,
}: ProjectCardProps) {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));

  return (
    <article className="rounded-2xl border border-black/10 bg-[var(--background)] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold tracking-tight text-[var(--foreground)]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[var(--foreground)]/55">
            Created {formatDate(created_at)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {homepage && (
            <Link
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live site for ${title}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[var(--foreground)]/75 transition hover:bg-black/5 hover:text-[var(--foreground)] dark:border-white/10 dark:hover:bg-white/10"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}

          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open GitHub repository for ${title}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[var(--foreground)]/75 transition hover:bg-black/5 hover:text-[var(--foreground)] dark:border-white/10 dark:hover:bg-white/10"
          >
            <FaGithub className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <p className="mb-5 leading-7 text-[var(--foreground)]/75">
        {description || "No description provided."}
      </p>

      {tags.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-medium text-[var(--foreground)]/75 dark:border-white/10 dark:bg-white/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 pt-4 text-sm text-[var(--foreground)]/60 dark:border-white/10">
        {language && (
          <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-xs font-medium text-[var(--foreground)] dark:bg-white/[0.05]">
            {language}
          </span>
        )}

        {typeof stargazers_count === "number" && <span>★ {stargazers_count}</span>}
        {typeof forks_count === "number" && <span>⑂ {forks_count}</span>}

        <span>Updated {formatDate(pushed_at)}</span>
      </div>
    </article>
  );
}