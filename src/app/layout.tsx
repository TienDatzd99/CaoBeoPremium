// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import ClientCartProvider from '@/components/ClientCartProvider';
import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cửa hàng tài khoản Premium',
  description: 'Mua tài khoản premium như Netflix, YouTube, Canva, ChatGPT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-100 relative overflow-x-hidden`}>
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/20 to-gray-100/30"></div>
          
          {/* Animated floating elements */}
          <div className="absolute inset-0">
            {/* Floating circles */}
            <svg className="absolute top-10 left-10 w-20 h-20 text-blue-200/30 animate-bounce" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="currentColor">
                <animate attributeName="opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite"/>
              </circle>
            </svg>
            
            <svg className="absolute top-32 right-20 w-16 h-16 text-slate-300/25 animate-pulse" viewBox="0 0 100 100">
              <polygon points="50,15 60,40 85,40 65,60 75,85 50,70 25,85 35,60 15,40 40,40" fill="currentColor">
                <animate attributeName="opacity" values="0.1;0.25;0.1" dur="3s" repeatCount="indefinite"/>
              </polygon>
            </svg>
            
            <svg className="absolute bottom-20 left-32 w-12 h-12 text-gray-300/20" viewBox="0 0 100 100">
              <rect x="20" y="20" width="60" height="60" fill="currentColor" transform="rotate(45 50 50)">
                <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="6s" repeatCount="indefinite"/>
              </rect>
            </svg>
            
            <svg className="absolute top-1/2 right-10 w-14 h-14 text-blue-300/15" viewBox="0 0 100 100">
              <path d="M50,20 Q80,50 50,80 Q20,50 50,20" fill="currentColor">
                <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3.5s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-3">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#94a3b8" strokeWidth="0.3">
                    <animate attributeName="stroke-opacity" values="0.05;0.15;0.05" dur="5s" repeatCount="indefinite"/>
                  </path>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10">
          <SessionProviderWrapper>
            <ClientCartProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </ClientCartProvider>
          </SessionProviderWrapper>
        </div>
      </body>
    </html>
  );
}
