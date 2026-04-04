"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        backgroundColor: scrolled ? "var(--glass)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
        <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold text-[var(--foreground)] hover:text-blue-500 transition"
            onClick={closeMenu}
          >
            albinr.dev
          </Link>

          <div className="hidden sm:flex gap-6 items-center">
            <ul className="flex gap-6 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    className={`transition ${
                      pathname === item.href
                        ? "text-blue-500"
                        : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          <button
            className="sm:hidden text-[var(--foreground)]"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>
      <MobileNav isOpen={isOpen} closeMenu={closeMenu} navItems={navItems} />
    </>
  );
}
