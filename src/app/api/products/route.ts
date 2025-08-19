import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Product from '@/models/Product';
import Service from '@/models/Service';

export async function GET(req: Request) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const service = searchParams.get('service');

    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
      }
      const serviceData = await Service.findOne({ name: product.service });
      return NextResponse.json({ ...product.toObject(), image: serviceData?.image || '/images/placeholder.png' });
    }

    if (service) {
      const products = await Product.find({ service });
      const serviceData = await Service.findOne({ name: service });
      const productsWithImage = products.map((p) => ({
        ...p.toObject(),
        image: serviceData?.image || '/images/placeholder.png',
      }));
      return NextResponse.json(productsWithImage);
    }

    const products = await Product.find({});
    const services = await Service.find({});
    const productsWithImage = products.map((p) => {
      const serviceData = services.find((s) => s.name === p.service);
      return { ...p.toObject(), image: serviceData?.image || '/images/placeholder.png' };
    });
    return NextResponse.json(productsWithImage);
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