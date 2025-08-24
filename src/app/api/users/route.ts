import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectMongo();
    
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json(users);

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, role } = await request.json();

    await connectMongo();
    
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'Không tìm thấy user' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Cập nhật quyền thành công',
      user
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    );
  }
}
