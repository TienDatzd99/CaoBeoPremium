import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectMongo();
    
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service parameter is required' },
        { status: 400 }
      );
    }

    // Lấy tất cả sản phẩm của cùng service
    const variants = await Product.find({ service })
      .sort({ price: 1 }) // Sắp xếp theo giá tăng dần
      .select('_id name price duration features note');

    return NextResponse.json(variants);
  } catch (error) {
    console.error('Error fetching product variants:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}
