"use client";

import Button from "@/components/Button";
import ImageCarousel from "@/components/ImageCarousel";

export default function Home() {
  return (
    <section className="px-6 pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-[var(--foreground)]/50">
            Software Engineer
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Hi, I’m Albin.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--foreground)]/72 sm:text-xl">
            I like combining problem-solving, design sense, and engineering to build software people actually enjoy using.
          </p>

          <p className="mt-4 max-w-xl text-base text-[var(--foreground)]/55 sm:text-lg">
            Outside of coding, I’m into hiking, skiing, running, and strength
            training.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/projects">View My Work</Button>
            <Button href="/contact" variant="outline">
              Contact Me
            </Button>
          </div>
        </div>

        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <ImageCarousel
            images={[
              { src: "/images/me-1.jpg", alt: "Albin Ryberg portrait" },
              { src: "/images/me-2.jpg", alt: "Albin Ryberg working at airport" },
              { src: "/images/me-3.jpg", alt: "Albin Ryberg skiing in Japan" },
              { src: "/images/me-4.jpg", alt: "Albin Ryberg in the outdoors" },
              { src: "/images/me-5.jpg", alt: "Albin Ryberg getting ready to head out" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}