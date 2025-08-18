import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectMongo from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectMongo();
  const orders = await Order.find({ user: session.user.id }).populate('product');
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectMongo();
  const { productId, accountDetails } = await req.json();
  const order = await Order.create({ user: session.user.id, product: productId, accountDetails });
  await User.findByIdAndUpdate(session.user.id, { $push: { orders: order._id } });
  return NextResponse.json(order);
}