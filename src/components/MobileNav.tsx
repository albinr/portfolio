"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/utils/TransitionLink";
import ThemeToggle from "@/components/ThemeToggle";
import { X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  closeMenu: () => void;
  navItems: NavItem[];
}

export default function MobileNav({
  isOpen,
  closeMenu,
  navItems,
}: MobileNavProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 sm:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-[85vw] max-w-sm flex-col border-l border-white/10 bg-[var(--background)]/90 shadow-2xl backdrop-blur-xl outline-none transition-transform duration-300 ease-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <span className="text-sm font-medium tracking-wide text-[var(--foreground)]/60">
            Menu
          </span>

          <button
            onClick={closeMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--foreground)] transition hover:bg-[var(--foreground)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 pb-6 pt-2">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex min-h-[52px] items-center rounded-2xl px-4 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "text-[var(--foreground)]/80 hover:bg-[var(--foreground)]/8 hover:text-[var(--foreground)]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--foreground)]/60">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}