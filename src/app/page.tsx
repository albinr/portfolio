"use client";
import Button from "@/components/Button";
import ImageCarousel from "@/components/ImageCarousel";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-6xl w-full">
        <div className="flex justify-center">
          <ImageCarousel
            images={[
              { src: "/images/me-1.jpg", alt: "Albin Ryberg 1" },
              { src: "/images/me-2.jpg", alt: "Albin Ryberg 2" },
              { src: "/images/me-3.jpg", alt: "Albin Ryberg 3" },
              { src: "/images/me-4.jpg", alt: "Albin Ryberg 4" },
              { src: "/images/me-5.jpg", alt: "Albin Ryberg 5" },
            ]}
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">Hi, I’m Albin 👋</h1>
          <p className="text-lg text-muted mb-6">
            Web developer, Hiker, Skier, Runner and Gym goer.
          </p>
          <div className="flex gap-4">
            <Button href="/projects">View My Work</Button>
            <Button href="/contact" variant="outline">
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
