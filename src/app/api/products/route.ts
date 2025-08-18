// app/api/products/route.ts
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    console.log('Gọi API /api/products');
    await connectMongo();
    console.log('Kết nối MongoDB thành công');
    const products = await Product.find({});
    console.log('Sản phẩm lấy được:', products);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Lỗi trong API /api/products:', error);
    return NextResponse.json({ error: 'Lỗi server khi lấy sản phẩm' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongo();
    const data = await req.json();
    const product = await Product.create(data);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    return NextResponse.json({ error: 'Không thể thêm sản phẩm' }, { status: 500 });
  }
}