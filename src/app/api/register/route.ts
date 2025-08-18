// app/api/register/route.ts
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectMongo();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Thiếu email hoặc mật khẩu' }, { status: 400 });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email đã tồn tại' }, { status: 400 });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    return NextResponse.json({ id: user._id, email: user.email }, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    return NextResponse.json({ error: 'Lỗi server khi đăng ký' }, { status: 500 });
  }
}