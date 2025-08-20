// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cửa hàng tài khoản Premium',
  description: 'Mua tài khoản premium như Netflix, YouTube, Canva, ChatGPT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <SessionProviderWrapper>
          {/* HEADER */}
       
             <Header/>
     

          {/* CONTENT */}
          <main className="min-h-screen container mx-auto p-4 pt-[180px]">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="bg-gray-800 text-white p-4 text-center text-sm">
            © 2025 Cửa hàng Premium
          </footer>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
