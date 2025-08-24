"use client";

import React, { useEffect, useRef, useState } from "react";

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
  const flickityRef = useRef<{ destroy: () => void } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const initFlickity = async () => {
      try {
        const Flickity = (await import("flickity")).default;
        
        if (carouselRef.current && !flickityRef.current) {
          flickityRef.current = new Flickity(carouselRef.current, {
            cellAlign: "center",
            contain: true,
            pageDots: false,
            prevNextButtons: true,
            groupCells: true,
          });
        }
      } catch (error) {
        console.error('Lỗi khi tải Flickity:', error);
      }
    };

    initFlickity();

    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
        flickityRef.current = null;
      }
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="relative mb-8 mt-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
          <div className="flex space-x-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="w-16 h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-8 mt-6">
      {/* Glass container wrapper */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/10 via-transparent to-slate-100/10 rounded-3xl"></div>
        
        <div ref={carouselRef} className="carousel relative z-10">
          {categories.map((item, idx) => (
            <div
              key={idx}
              className="carousel-cell w-28 flex flex-col items-center justify-center mx-2 group cursor-pointer"
            >
              {/* Icon container with glass effect */}
              <div className="relative mb-3">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-2xl"></div>
                </div>
              </div>
              
              {/* Label */}
              <span className="text-xs font-bold text-gray-700 text-center leading-tight group-hover:text-blue-600 transition-colors duration-300 drop-shadow-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselCategories;
