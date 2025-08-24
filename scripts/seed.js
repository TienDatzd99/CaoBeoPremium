// Tạo dữ liệu mẫu cho testing
const mongoose = require('mongoose');

// Cấu hình kết nối MongoDB
const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB đã kết nối sẵn');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://datletien2004:08012004@cluster0.x8enfi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('Đã kết nối MongoDB');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error);
    throw error;
  }
};

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  service: String,
  duration: String,
  stock: Number,
  note: String,
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: String,
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

async function createSampleData() {
  try {
    await connectMongo();
    
    // Tạo services
    const services = [
      { name: 'Netflix', image: '/images/netflix.png' },
      { name: 'Spotify', image: '/images/spotify.png' },
      { name: 'Canva', image: '/images/canva.png' },
      { name: 'YouTube', image: '/images/youtube.png' },
      { name: 'ChatGPT', image: '/images/chatgpt.png' },
    ];

    for (const service of services) {
      await Service.findOneAndUpdate(
        { name: service.name },
        service,
        { upsert: true, new: true }
      );
    }

    // Tạo products
    const products = [
      {
        name: 'Netflix Premium 1 tháng',
        price: 45000,
        description: 'Tài khoản Netflix Premium 1 tháng',
        service: 'Netflix',
        duration: '1 tháng',
        stock: 100,
        note: 'Xem phim chất lượng 4K'
      },
      {
        name: 'Spotify Premium 1 tháng',
        price: 35000,
        description: 'Tài khoản Spotify Premium 1 tháng',
        service: 'Spotify',
        duration: '1 tháng',
        stock: 50,
        note: 'Nghe nhạc không quảng cáo'
      },
      {
        name: 'Canva Pro 1 tháng',
        price: 55000,
        description: 'Tài khoản Canva Pro 1 tháng',
        service: 'Canva',
        duration: '1 tháng',
        stock: 30,
        note: 'Thiết kế đồ họa chuyên nghiệp'
      },
      {
        name: 'YouTube Premium 1 tháng',
        price: 40000,
        description: 'Tài khoản YouTube Premium 1 tháng',
        service: 'YouTube',
        duration: '1 tháng',
        stock: 75,
        note: 'Xem video không quảng cáo'
      },
      {
        name: 'ChatGPT Plus 1 tháng',
        price: 120000,
        description: 'Tài khoản ChatGPT Plus 1 tháng',
        service: 'ChatGPT',
        duration: '1 tháng',
        stock: 20,
        note: 'AI thông minh GPT-4'
      },
    ];

    await Product.deleteMany({}); // Xóa dữ liệu cũ
    await Product.insertMany(products);

    console.log('✅ Đã tạo dữ liệu mẫu thành công!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi tạo dữ liệu mẫu:', error);
    process.exit(1);
  }
}

createSampleData();
