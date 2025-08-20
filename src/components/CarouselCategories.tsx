"use client";

import React, { useEffect, useRef } from "react";
// @ts-expect-error: vì flickity chưa có type
import Flickity from "flickity";
import "flickity/css/flickity.css";

interface Category {
  icon: string;
  label: string;
}

const categories: Category[] = [
  { icon: "🎬", label: "XEM PHIM" },
  { icon: "⚽", label: "THỂ THAO" },
  { icon: "❤️", label: "SỨC KHỎE" },
  { icon: "💼", label: "LÀM VIỆC" },
  { icon: "📐", label: "THIẾT KẾ - ĐỒ HỌA" },
  { icon: "✨", label: "AI" },
  { icon: "🎮", label: "GAME" },
  { icon: "📊", label: "GIAO DỊCH" },
];

const CarouselCategories: React.FC = () => {
  const flickityRef = useRef<Flickity | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      flickityRef.current = new Flickity(carouselRef.current, {
        cellAlign: "center",
        contain: true,
        pageDots: false,
        prevNextButtons: true,
        groupCells: true, // tự gom cho responsive
      });
    }

    return () => {
      flickityRef.current?.destroy();
    };
  }, []);

  return (
    <div className="w-full py-6 bg-gray-100">
      <div ref={carouselRef} className="carousel">
        {categories.map((item, idx) => (
          <div
            key={idx}
            className="carousel-cell w-28 flex flex-col items-center justify-center mx-2"
          >
            {/* Icon */}
            <div className="text-4xl mb-2">{item.icon}</div>
            {/* Label */}
            <span className="text-sm font-semibold text-gray-800 text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselCategories;
