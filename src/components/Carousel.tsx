"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const flktyRef = useRef<{ destroy: () => void } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const initFlickity = async () => {
      try {
        // Dynamic import để tránh SSR issues
        const Flickity = (await import("flickity")).default;
        
        if (carouselRef.current && !flktyRef.current) {
          flktyRef.current = new Flickity(carouselRef.current, {
            cellAlign: "center",
            contain: false,
            pageDots: false,
            wrapAround: true,
            prevNextButtons: true,
            selectedAttraction: 0.03,
            friction: 0.15,
          });
        }
      } catch (error) {
        console.error('Lỗi khi tải Flickity:', error);
      }
    };

    initFlickity();

    return () => {
      if (flktyRef.current) {
        flktyRef.current.destroy();
        flktyRef.current = null;
      }
    };
  }, [mounted]);

  if (!mounted) {
    // Hiển thị skeleton loading khi chưa mount
    return (
      <div className="flex space-x-4 p-4 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-shrink-0 w-1/4 h-[180px] rounded-2xl bg-gray-200 animate-pulse min-w-[200px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="relative mb-8 mt-6">
      {/* Glass container wrapper */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 via-transparent to-blue-100/10 rounded-3xl"></div>
        
        <div className="carousel relative z-10" ref={carouselRef}>

      <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:bg-white/15">
          <Image
            src="/Capcut.jpg"
            alt="Capcut"
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
        </div>
      </div>

       <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:bg-white/15">
          <Image
            src="/GPT5.jpg"
            alt="GPT5"
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
        </div>
      </div>
      
      <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:bg-white/15">
          <Image
            src="/Youtube.jpg"
            alt="YouTube"
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
        </div>
      </div>

       <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:bg-white/15">
          <Image
            src="/Canva.jpg"
            alt="Canva"
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
        </div>
      </div>
      
      <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:bg-white/15">
          <Image
            src="/a.jpg"
            alt="Adobe"
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
        </div>
      </div>
      
       <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:bg-white/15">
          <Image
            src="/Google.jpg"
            alt="Google"
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
        </div>
      </div>
      
      <div className="carousel-cell w-1/4 h-[180px] rounded-2xl overflow-hidden relative group">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:bg-white/15">
          <Image
            src="/Spotify.jpg"
            alt="Spotify"
            fill
            className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-2xl"></div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
