"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type ImageCarouselProps = {
  images: { src: string; alt: string }[];
  width?: number;
  height?: number;
  autoSwitchInterval?: number; // in ms
};

export default function ImageCarousel({
  images,
  width = 350,
  height = 450,
  autoSwitchInterval = 6000,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, autoSwitchInterval);
    return () => clearInterval(interval);
  }, [images.length, autoSwitchInterval]);

  return (
    <div
      className="relative shadow-2xl overflow-hidden rounded-2xl"
      style={{ width, height }}
    >
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.src}
          alt={img.alt}
          width={width}
          height={height}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          priority={i === 0}
        />
      ))}

      {/* Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-4 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === index ? "bg-blue-500" : "bg-gray-400/40"
            }`}
            onClick={() => setIndex(i)}
            aria-label={`Switch to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
