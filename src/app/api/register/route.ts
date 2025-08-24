// app/api/register/route.ts
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectMongo();
    const { email, password, name } = await req.json();
    
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Vui lòng điền đầy đủ thông tin' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu phải có ít nhất 6 ký tự' }, { status: 400 });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email này đã được sử dụng' }, { status: 400 });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = await User.create({ 
      email, 
      password: hashedPassword, 
      name,
      provider: 'credentials',
      role: 'user'
    });
    
    return NextResponse.json({ 
      message: 'Đăng ký thành công',
      user: {
        id: user._id, 
        email: user.email,
        name: user.name
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
    return NextResponse.json({ error: 'Lỗi server khi đăng ký' }, { status: 500 });
  }
}