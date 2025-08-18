// lib/mongodb.ts
import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB đã kết nối sẵn');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Đã kết nối MongoDB');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error);
    throw error;
  }
};

export default connectMongo;