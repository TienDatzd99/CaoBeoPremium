"use client";

import React from "react";

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

const CarouselCategoriesTemp: React.FC = () => {
  return (
    <div className="w-full py-6 bg-gray-100">
      <div className="flex overflow-x-auto space-x-4 px-4">
        {categories.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-28 flex flex-col items-center justify-center mx-2"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <span className="text-sm font-semibold text-gray-800 text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselCategoriesTemp;
