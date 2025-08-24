"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="overflow-x-auto" ref={carouselRef}>
      <div className="flex space-x-4 p-4">
        <div className="flex-shrink-0 w-1/4 h-[180px] rounded-2xl overflow-hidden relative min-w-[200px]">
          <Image
            src="/Capcut.jpg"
            alt="Capcut"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="flex-shrink-0 w-1/4 h-[180px] rounded-2xl overflow-hidden relative min-w-[200px]">
          <Image
            src="/GPT5.jpg"
            alt="GPT5"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        
        <div className="flex-shrink-0 w-1/4 h-[180px] rounded-2xl overflow-hidden relative min-w-[200px]">
          <Image
            src="/Youtube.jpg"
            alt="Youtube"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="flex-shrink-0 w-1/4 h-[180px] rounded-2xl overflow-hidden relative min-w-[200px]">
          <Image
            src="/Canva.jpg"
            alt="Canva"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        
        <div className="flex-shrink-0 w-1/4 h-[180px] rounded-2xl overflow-hidden relative min-w-[200px]">
          <Image
            src="/a.jpg"
            alt="A"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        
        <div className="flex-shrink-0 w-1/4 h-[180px] rounded-2xl overflow-hidden relative min-w-[200px]">
          <Image
            src="/Spotify.jpg"
            alt="Spotify"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
