"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: number | string;
  src: string;
  alt: string;
}

interface AccordionGalleryProps {
  items: GalleryItem[];
}

export function AccordionGallery({ items }: AccordionGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-full h-full gap-2 md:gap-3">
      {items.map((item, index) => {
        const isActive = active === index;
        return (
          <div
            key={item.id}
            onMouseEnter={() => setActive(index)}
            className={cn(
              "relative h-full transition-all duration-500 ease-out cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-lg ring-1 ring-black/5 bg-white",
              isActive ? "flex-[4] opacity-100" : "flex-[1] opacity-70 hover:opacity-90"
            )}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 w-full h-full object-cover object-left md:object-center transition-all duration-500"
              style={{
                filter: isActive ? "grayscale(0%)" : "grayscale(20%)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
