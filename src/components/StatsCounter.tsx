"use client";

import { useEffect, useState, useRef } from 'react';

interface StatItem {
  icon: string;
  value: number;
  label: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { icon: "🏪", value: 399, label: "CTV", suffix: "" },
  { icon: "🛒", value: 1, label: "Đơn hàng", suffix: "T+" },
  { icon: "💬", value: 39012, label: "REVIEWS", suffix: "" },
  { icon: "💡", value: 6, label: "hoạt động", suffix: "năm" },
];

const StatsCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(current + increment, stat.value);
        
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.floor(current);
          return newValues;
        });

        if (step >= steps || current >= stat.value) {
          clearInterval(timer);
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = stat.value;
            return newValues;
          });
        }
      }, duration / steps);
    });
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-16 mt-8 relative z-10">
      <div className="w-full max-w-none px-4 md:px-8">
        {/* Glass container wrapper với background xanh nhạt và viền cam */}
        <div className="bg-blue-100/60 backdrop-blur-md border-2 border-orange-400/80 rounded-3xl p-8 shadow-2xl">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200/20 via-transparent to-orange-200/20 rounded-3xl"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                {/* Icon container */}
                <div className="relative mb-4 mx-auto">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/70 backdrop-blur-sm border-2 border-orange-400/60 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/80 group-hover:border-orange-500/80 mx-auto">
                    <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </span>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/50 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
                  </div>
                </div>

                {/* Counter number */}
                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-sm">
                    {animatedValues[index].toLocaleString()}
                    {stat.suffix && (
                      <span className="text-blue-600">{stat.suffix}</span>
                    )}
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide group-hover:text-orange-600 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
