"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  href?: string;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

  const size = "h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-[15px]";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: `
      bg-[var(--foreground)]
      text-[var(--background)]
      shadow-[var(--glow)]
      hover:-translate-y-0.5
      hover:opacity-95
    `,
    outline: `
      border
      border-[var(--foreground)]/15
      bg-transparent
      text-[var(--foreground)]
      hover:-translate-y-0.5
      hover:bg-[var(--foreground)]/6
      hover:border-[var(--foreground)]/30
    `,
    ghost: `
      bg-[var(--foreground)]/6
      text-[var(--foreground)]
      hover:-translate-y-0.5
      hover:bg-[var(--foreground)]/12
    `,
  };

  const combined = `${base} ${size} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}