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
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/", {
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
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 sm:py-32 font-sans">
      <div className="max-w-xl w-full">
        {/* Hidden blueprint form for Netlify detection */}
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          hidden
        >
          <input type="hidden" name="form-name" value="contact" />
          <input name="name" type="text" />
          <input name="email" type="email" />
          <textarea name="message" />
          <input name="bot-field" type="text" />
        </form>

        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
          Contact Me
        </h1>
        <p className="text-lg text-center mb-10">
          Have a question, idea, or project? Let’s talk.
        </p>

        {!submitted ? (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />

            <p className="hidden">
              <label>
                Don’t fill this out:
                <input
                  name="bot-field"
                  value={form["bot-field"]}
                  onChange={handleChange}
                />
              </label>
            </p>

            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-full"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-3xl"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit">Send Message</Button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              Thanks for your message!
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              I’ll get back to you as soon as I can.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}