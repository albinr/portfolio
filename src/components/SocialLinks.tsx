import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const socials = [
  { name: "GitHub", href: "https://github.com/albinr", icon: FaGithub },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/albin-ryberg",
    icon: FaLinkedinIn,
  },
  { name: "Email", href: "mailto:albin@rybergs.net", icon: Mail },
];

export default function SocialLinks() {
  return (
    <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 sm:flex">
      <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-[var(--background)] p-2 shadow-sm dark:border-white/10">
        {socials.map(({ name, href, icon: Icon }) => {
          const isEmail = href.startsWith("mailto:");

          return (
            <a
              key={name}
              href={href}
              target={isEmail ? undefined : "_blank"}
              rel={isEmail ? undefined : "noopener noreferrer"}
              aria-label={name}
              title={name}
              className="group relative inline-flex h-11 w-11 items-center justify-center rounded-xl text-[var(--foreground)]/72 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/[0.05] hover:text-[var(--foreground)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/20 dark:hover:bg-white/[0.06]"
            >
              <Icon className="h-5 w-5" />

              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-black/10 bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--foreground)] opacity-0 shadow-sm transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:border-white/10">
                {name}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}