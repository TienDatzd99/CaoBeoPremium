// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Link from 'next/link';
import Image from 'next/image';

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
          <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo thương hiệu */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          width={120}
          height={60}
          alt="Cửa hàng Premium"
          priority
        />
      </Link>

      {/* Navigation */}
      <nav className="flex gap-6 text-gray-700 font-medium">
        <Link href="/">Trang chủ</Link>
        <Link href="/san-pham">Sản phẩm</Link>
        <Link href="/lien-he">Liên hệ</Link>
      </nav>
    </header>

          {/* CONTENT */}
          <main className="min-h-screen container mx-auto p-4">{children}</main>

          {/* FOOTER */}
          <footer className="bg-gray-800 text-white p-4 text-center text-sm">
            © 2025 Cửa hàng Premium
          </footer>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
