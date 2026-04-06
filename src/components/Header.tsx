"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { TransitionLink } from "@/components/utils/TransitionLink";
import MobileNav from "@/components/MobileNav";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-5xl px-2 pt-2">
          <nav
            className={`flex items-center justify-between rounded-2xl border px-2 py-3 transition-all duration-200 sm:px-5 ${
              scrolled
                ? "border-black/10 bg-[var(--background)] shadow-lg dark:border-white/10"
                : "border-black/5 bg-[var(--background)] shadow-sm dark:border-white/10"
            }`}
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="text-base font-semibold tracking-tight text-[var(--foreground)] transition hover:opacity-80 sm:text-lg"
            >
              albinr.dev
            </Link>

            <div className="hidden items-center gap-3 sm:flex">
              <ul className="flex items-center gap-1 rounded-full border border-black/5 bg-black/[0.02] p-1 dark:border-white/10 dark:bg-white/[0.03]">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <TransitionLink
                        href={item.href}
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-[var(--foreground)] text-[var(--background)]"
                            : "text-[var(--foreground)]/70 hover:bg-black/[0.05] hover:text-[var(--foreground)] dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        {item.label}
                      </TransitionLink>
                    </li>
                  );
                })}
              </ul>

              <div className="ml-1">
                <ThemeToggle />
              </div>
            </div>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--foreground)] transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/20 dark:hover:bg-white/10 sm:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <Menu size={20} />
            </button>
          </nav>
        </div>
      </header>

      <MobileNav isOpen={isOpen} closeMenu={closeMenu} navItems={navItems} />
    </>
  );
}