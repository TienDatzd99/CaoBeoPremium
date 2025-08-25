// scripts/updateProductCategories.ts
import mongoose from 'mongoose';
import Product from '../src/models/Product';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const categoryMap = {
  'Youtube Premium': 'Giải trí',
  'Netflix': 'Xem phim', 
  'VIEON': 'Xem phim',
  'Canva': 'Học Tập',
  'Doulingo': 'Học Tập',
  'ADOBE': 'Làm Việc',
  'Google Drive': 'Làm Việc',
  'Capcut': 'Làm Việc',
  'ChatGPT': 'AI',
  'Cursor Pro': 'AI',
};

async function updateCategories() {
  await mongoose.connect(process.env.MONGODB_URI || '');
  for (const [service, category] of Object.entries(categoryMap)) {
    const result = await Product.updateMany({ service }, { $set: { category } });
    console.log(`Service: ${service} -> Category: ${category} | Updated: ${result.modifiedCount}`);
  }
  await mongoose.disconnect();
  console.log('Cập nhật category cho tất cả sản phẩm xong!');
}

updateCategories();