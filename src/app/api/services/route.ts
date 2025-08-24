import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectMongo();
    const services = await Service.find({});
    return NextResponse.json(services);
  } catch (error) {
    console.error('Lỗi trong API /api/services:', error);
    return NextResponse.json({ error: 'Lỗi server khi lấy services' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongo();
    const data = await req.json();
    const service = await Service.create(data);
    return NextResponse.json(service);
  } catch (error) {
    console.error('Lỗi khi thêm service:', error);
    return NextResponse.json({ error: 'Không thể thêm service' }, { status: 500 });
  }
}
