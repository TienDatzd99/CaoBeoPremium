// app/auth/layout.tsx
import '../globals.css';
import { Inter } from 'next/font/google';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Đăng nhập | Cửa hàng Premium',
  description: 'Đăng nhập vào cửa hàng tài khoản premium',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <SessionProviderWrapper>
          {/* CONTENT - Không có header */}
          <main className="min-h-screen">
            {children}
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
