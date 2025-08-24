// lib/mongodb.ts
import mongoose from 'mongoose';

// Track connection state
let isConnected = false;

const connectMongo = async () => {
  // If already connected, return
  if (isConnected && mongoose.connections[0].readyState === 1) {
    console.log('MongoDB đã kết nối sẵn');
    return;
  }

  // If connecting, wait for it
  if (mongoose.connections[0].readyState === 2) {
    console.log('MongoDB đang kết nối, đợi...');
    while (mongoose.connections[0].readyState === 2) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (mongoose.connections[0].readyState === 1) {
      isConnected = true;
      return;
    }
  }

  try {
    // Set mongoose options to prevent deprecation warnings
    mongoose.set('strictQuery', false);
    
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    console.log('Đang kết nối MongoDB...');
    await mongoose.connect(mongoUri, {
      bufferCommands: true, // Allow buffering to wait for connection
    });
    
    isConnected = true;
    console.log('Đã kết nối MongoDB thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error);
    isConnected = false;
    throw error;
  }
};

export default connectMongo;