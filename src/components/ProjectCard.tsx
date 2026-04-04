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
    <div className="bg-glass backdrop-blur-soft border rounded-xl shadow-md hover:shadow-glow transition p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-foreground">
          {title}
        </h2>
        <div className="flex gap-3">
          {homepage && (
            <Link
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
          )}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            <FaGithub className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <p className="mb-4">
        {description || "No description provided."}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-muted-light rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
        {language && (
          <span className="text-xs px-2 py-1 rounded">
            {language}
          </span>
        )}
        {typeof stargazers_count === "number" && <span>⭐ {stargazers_count}</span>}
        {typeof forks_count === "number" && <span>🍴 {forks_count}</span>}
        <span>Created {formatDate(created_at)}</span>
        <span>Updated {formatDate(pushed_at)}</span>
      </div>
    </div>
  );
}
