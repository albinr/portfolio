import Image from "next/image";
import Timeline from "@/components/Timeline";

export default function AboutPage() {
  return (
    <section className="px-6 pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/images/me-1.jpg"
              alt="Albin Ryberg"
              width={180}
              height={180}
              priority
              className="rounded-3xl border border-black/10 object-cover shadow-sm dark:border-white/10"
            />
          </div>

          <div className="rounded-3xl border border-black/10 bg-[var(--background)] p-6 shadow-sm dark:border-white/10 sm:p-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-[var(--foreground)]/50">
              About
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Building thoughtful web experiences.
            </h1>

            <div className="mt-6 space-y-5 text-base leading-8 text-[var(--foreground)]/75 sm:text-lg">
              <p>
                I’m Albin, a web developer based in Sweden and currently in my
                third year of a Bachelor’s in Web Programming. I’m most
                interested in building clean, responsive, and performant web
                applications.
              </p>

              <p>
                I work mainly with Next.js, React, Tailwind CSS, and TypeScript,
                and I also have experience with backend technologies like
                Node.js, Python, and Flask. I enjoy turning complex problems
                into clear, practical solutions.
              </p>

              <p>
                Outside of coding, I’m into fitness, the outdoors, and exploring
                how technology can solve real-world problems. I care a lot about
                continuous learning and meaningful work.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <Timeline />
        </div>
      </div>
    </section>
  );
}