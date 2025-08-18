import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectMongo from '@/lib/mongodb';
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const session = event.data.object;
    await connectMongo();
    // Cập nhật order: Thêm accountDetails (có thể từ metadata hoặc auto)
    await Order.updateOne({ /* condition */ }, { status: 'completed', accountDetails: 'example@email.com:password' });
  }

  return NextResponse.json({ received: true });
}