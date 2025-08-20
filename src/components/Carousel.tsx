"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
// @ts-expect-error: vì flickity chưa có type
import Flickity from "flickity";
import "flickity/css/flickity.css";

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const flktyRef = useRef<Flickity | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      flktyRef.current = new Flickity(carouselRef.current, {
        cellAlign: "center",   // 👈 căn giữa để thấy nửa hai bên
        contain: false,
        pageDots: false,
        wrapAround: true,
        prevNextButtons: true,
        selectedAttraction: 0.03,
        friction: 0.15,
      });
    }

    return () => {
      if (flktyRef.current) {
        flktyRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>

      <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative">
        <Image
          src="/Capcut.jpg"
          alt="Capcut"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

       <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative">
        <Image
          src="/GPT5.jpg"
          alt="GPT5"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative">
        <Image
          src="/Youtube.jpg"
          alt="Capcut"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

       <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative">
        <Image
          src="/Canva.jpg"
          alt="GPT5"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative">
        <Image
          src="/a.jpg"
          alt="GPT5"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
       <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative">
        <Image
          src="/a.jpg"
          alt="GPT5"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative">
        <Image
          src="/Spotify.jpg"
          alt="GPT5"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}
