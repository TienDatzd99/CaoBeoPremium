'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscribeButton() {
  const { data: session } = useSession();

  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/stripe/checkout', { method: 'POST' });
    const { sessionId } = await response.json();
    stripe?.redirectToCheckout({ sessionId });
  };

  if (session?.user.isPremium) return <p>You are premium!</p>;
  return <button onClick={handleSubscribe} className="bg-blue-500 text-white p-2">Subscribe to Premium</button>;
}