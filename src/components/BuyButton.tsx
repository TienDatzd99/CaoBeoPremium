// components/BuyButton.tsx
'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BuyButton({ productId, price }: { productId: string; price: number }) {
  const { data: session } = useSession();

  const handleBuy = async () => {
    if (!session) {
      alert('Vui lòng đăng nhập để mua hàng');
      return;
    }
    const stripe = await stripePromise;
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        body: JSON.stringify({ productId, price }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Lỗi khi tạo phiên thanh toán');
      }
      const { sessionId } = await response.json();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Lỗi thanh toán:', error);
      alert('Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.');
    }
  };

  return (
    <button onClick={handleBuy} className="bg-green-500 text-white p-2 rounded w-full">
      Mua ngay - {price.toLocaleString('vi-VN')} VND
    </button>
  );
}