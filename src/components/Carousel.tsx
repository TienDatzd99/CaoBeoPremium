"use client";

import { useEffect, useRef } from "react";
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
      <div className="carousel-cell w-1/4 h-[180px] bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold">
        Cell 1
      </div>
      <div className="carousel-cell w-1/4 h-[180px] bg-red-500 rounded-2xl flex items-center justify-center text-white font-bold">
        Cell 2
      </div>
      <div className="carousel-cell w-1/4 h-[180px] bg-green-500 rounded-2xl flex items-center justify-center text-white font-bold">
        Cell 3
      </div>
      <div className="carousel-cell w-1/4 h-[180px] bg-purple-500 rounded-2xl flex items-center justify-center text-white font-bold">
        Cell 4
      </div>
      <div className="carousel-cell w-1/4 h-[180px] bg-pink-500 rounded-2xl flex items-center justify-center text-white font-bold">
        Cell 5
      </div>
      <div className="carousel-cell w-1/4 h-[180px] bg-yellow-500 rounded-2xl flex items-center justify-center text-white font-bold">
        Cell 6
      </div>
    </div>
  );
}
