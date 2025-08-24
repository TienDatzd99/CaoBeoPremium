'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Cart from './Cart';
import Footer from './Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');
  const isProductDetailPage = pathname?.startsWith('/products/') && pathname !== '/products';

  // Nếu là trang auth, chỉ render children mà không có header/footer
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Nếu không phải trang auth, render layout đầy đủ
  return (
    <>
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <main className={`min-h-screen ${isProductDetailPage ? 'pt-18' : 'pt-[160px]'} ${isProductDetailPage ? '' : 'container mx-auto p-4'}`}>
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Fixed Cart Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Cart />
      </div>
    </>
  );
}
