import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectMongo();
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Lỗi trong API /api/categories:', error);
    return NextResponse.json({ error: 'Lỗi server khi lấy danh mục' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongo();
    const data = await req.json();
    const category = await Category.create(data);
    return NextResponse.json(category);
  } catch (error) {
    console.error('Lỗi khi thêm danh mục:', error);
    return NextResponse.json({ error: 'Không thể thêm danh mục' }, { status: 500 });
  }
}
