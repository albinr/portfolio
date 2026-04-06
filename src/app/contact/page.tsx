"use client";

import { useState } from "react";
import Button from "@/components/Button";

function encode(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    "bot-field": "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encode({
          "form-name": "contact",
          name: form.name,
          email: form.email,
          message: form.message,
          "bot-field": form["bot-field"],
        }),
      });

      if (!res.ok) {
        throw new Error("Form submission failed");
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        message: "",
        "bot-field": "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            Contact Me
          </h1>
          <p className="mt-4 text-base text-[var(--foreground)]/70 sm:text-lg">
            Have a question, idea, or project? Let’s talk.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-black/10 bg-[var(--background)] p-6 shadow-sm dark:border-white/10 sm:p-8">
          {!submitted ? (
            <form
              name="contact"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-5"
              netlify
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="hidden" aria-hidden="true">
                <label htmlFor="bot-field">
                  Don’t fill this out
                </label>
                <input
                  id="bot-field"
                  name="bot-field"
                  value={form["bot-field"]}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--foreground)]/30 dark:border-white/10"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--foreground)]/30 dark:border-white/10"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[var(--foreground)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-black/10 bg-transparent px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--foreground)]/30 dark:border-white/10"
                  placeholder="Tell me a bit about your idea or project..."
                />
              </div>

              {error && (
                <p className="text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">
                Thanks for your message
              </h2>
              <p className="mt-3 text-[var(--foreground)]/70">
                I’ll get back to you as soon as I can.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}