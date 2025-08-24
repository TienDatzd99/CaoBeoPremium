const mongoose = require('mongoose');

// Kết nối MongoDB
const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB đã kết nối sẵn');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://datletien2004:08012004@cluster0.x8enfi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Đã kết nối MongoDB');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error);
  }
};

// Schema sản phẩm
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  service: { type: String, required: true },
  duration: { type: String, required: true },
  stock: { type: Number, default: 100 },
  note: { type: String, default: 'bảo hành trong quá trình sử dụng' },
  image: { type: String },
  devices: { type: String }, // Số thiết bị hỗ trợ
  features: { type: String }, // Tính năng đặc biệt
});

// Schema service
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

// Dữ liệu sản phẩm theo yêu cầu
const newProducts = [
  // YOUTUBE PREMIUM + GOOGLE ONE + GEMINI AI PRO
  {
    name: 'YouTube Premium + Google One Drive + Gemini AI Pro - 1 tháng',
    price: 35000,
    description: 'Gói combo YouTube Premium, Google One Drive và Gemini AI Pro',
    service: 'YouTube',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/youtube.png',
    features: 'YouTube Premium + Google One + Gemini AI Pro'
  },
  {
    name: 'YouTube Premium + Google One Drive + Gemini AI Pro - 3 tháng',
    price: 75000,
    description: 'Gói combo YouTube Premium, Google One Drive và Gemini AI Pro',
    service: 'YouTube',
    duration: '3 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/youtube.png',
    features: 'YouTube Premium + Google One + Gemini AI Pro'
  },
  {
    name: 'YouTube Premium + Google One Drive + Gemini AI Pro - 6 tháng',
    price: 130000,
    description: 'Gói combo YouTube Premium, Google One Drive và Gemini AI Pro',
    service: 'YouTube',
    duration: '6 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/youtube.png',
    features: 'YouTube Premium + Google One + Gemini AI Pro'
  },
  {
    name: 'YouTube Premium + Google One Drive + Gemini AI Pro - 12 tháng',
    price: 180000,
    description: 'Gói combo YouTube Premium, Google One Drive và Gemini AI Pro',
    service: 'YouTube',
    duration: '12 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/youtube.png',
    features: 'YouTube Premium + Google One + Gemini AI Pro'
  },

  // NETFLIX 4K ULTRA
  {
    name: 'Netflix 4K Ultra - 1 tháng',
    price: 55000,
    description: 'Tài khoản Netflix 4K Ultra chất lượng cao nhất',
    service: 'Netflix',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/netflix.png',
    features: '4K Ultra'
  },
  {
    name: 'Netflix 4K Ultra - 3 tháng',
    price: 150000,
    description: 'Tài khoản Netflix 4K Ultra chất lượng cao nhất',
    service: 'Netflix',
    duration: '3 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/netflix.png',
    features: '4K Ultra'
  },
  {
    name: 'Netflix 4K Ultra - 6 tháng',
    price: 225000,
    description: 'Tài khoản Netflix 4K Ultra chất lượng cao nhất',
    service: 'Netflix',
    duration: '6 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/netflix.png',
    features: '4K Ultra'
  },
  {
    name: 'Netflix 4K Ultra - 1 năm',
    price: 275000,
    description: 'Tài khoản Netflix 4K Ultra chất lượng cao nhất',
    service: 'Netflix',
    duration: '1 năm',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/netflix.png',
    features: '4K Ultra'
  },

  // CAPCUT PRO
  {
    name: 'CapCut Pro - 1 tháng 3 thiết bị',
    price: 40000,
    description: 'Tài khoản CapCut Pro chỉnh sửa video chuyên nghiệp',
    service: 'CapCut',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/capcut.png',
    devices: '3 thiết bị'
  },
  {
    name: 'CapCut Pro - 6 tháng 1 thiết bị',
    price: 130000,
    description: 'Tài khoản CapCut Pro chỉnh sửa video chuyên nghiệp',
    service: 'CapCut',
    duration: '6 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/capcut.png',
    devices: '1 thiết bị'
  },
  {
    name: 'CapCut Pro - 1 năm 2 thiết bị',
    price: 200000,
    description: 'Tài khoản CapCut Pro chỉnh sửa video chuyên nghiệp',
    service: 'CapCut',
    duration: '1 năm',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/capcut.png',
    devices: '2 thiết bị'
  },
  {
    name: 'CapCut Pro - 1 năm 3 thiết bị',
    price: 250000,
    description: 'Tài khoản CapCut Pro chỉnh sửa video chuyên nghiệp',
    service: 'CapCut',
    duration: '1 năm',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/capcut.png',
    devices: '3 thiết bị'
  },

  // CANVA
  {
    name: 'Canva Pro - 1 tháng',
    price: 20000,
    description: 'Tài khoản Canva Pro thiết kế đồ họa chuyên nghiệp',
    service: 'Canva',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/canva.png'
  },
  {
    name: 'Canva Pro - 1 năm',
    price: 70000,
    description: 'Tài khoản Canva Pro thiết kế đồ họa chuyên nghiệp',
    service: 'Canva',
    duration: '1 năm',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/canva.png'
  },
  {
    name: 'Canva Pro - LifeTime',
    price: 80000,
    description: 'Tài khoản Canva Pro thiết kế đồ họa chuyên nghiệp - trọn đời',
    service: 'Canva',
    duration: 'LifeTime',
    stock: 100,
    note: 'bảo hành 1 năm',
    image: '/images/canva.png'
  },

  // CHATGPT
  {
    name: 'ChatGPT 4 Plus - 1 tháng 1 thiết bị',
    price: 80000,
    description: 'Tài khoản ChatGPT 4 Plus AI thông minh nhất',
    service: 'ChatGPT',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/chatgpt.png',
    devices: '1 thiết bị'
  },
  {
    name: 'ChatGPT 4 Plus - 1 tháng 2 thiết bị',
    price: 110000,
    description: 'Tài khoản ChatGPT 4 Plus AI thông minh nhất',
    service: 'ChatGPT',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/chatgpt.png',
    devices: '2 thiết bị'
  },
  {
    name: 'ChatGPT 4 Plus - 3 tháng 2 thiết bị',
    price: 170000,
    description: 'Tài khoản ChatGPT 4 Plus AI thông minh nhất',
    service: 'ChatGPT',
    duration: '3 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/chatgpt.png',
    devices: '2 thiết bị'
  },
  {
    name: 'ChatGPT 4 Plus - 6 tháng 2 thiết bị',
    price: 270000,
    description: 'Tài khoản ChatGPT 4 Plus AI thông minh nhất',
    service: 'ChatGPT',
    duration: '6 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/chatgpt.png',
    devices: '2 thiết bị'
  },
  {
    name: 'ChatGPT 4 Plus - 12 tháng 2 thiết bị',
    price: 520000,
    description: 'Tài khoản ChatGPT 4 Plus AI thông minh nhất',
    service: 'ChatGPT',
    duration: '12 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/chatgpt.png',
    devices: '2 thiết bị'
  },

  // ADOBE
  {
    name: 'Adobe Full APP - 1 tháng 2 thiết bị',
    price: 140000,
    description: 'Tài khoản Adobe Creative Cloud đầy đủ tất cả ứng dụng',
    service: 'Adobe',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/adobe.png',
    devices: '2 thiết bị',
    features: 'Full APP'
  },
  {
    name: 'Adobe Full APP - 3 tháng 2 thiết bị',
    price: 240000,
    description: 'Tài khoản Adobe Creative Cloud đầy đủ tất cả ứng dụng',
    service: 'Adobe',
    duration: '3 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/adobe.png',
    devices: '2 thiết bị',
    features: 'Full APP'
  },
  {
    name: 'Adobe Full APP - 6 tháng 2 thiết bị',
    price: 400000,
    description: 'Tài khoản Adobe Creative Cloud đầy đủ tất cả ứng dụng',
    service: 'Adobe',
    duration: '6 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/adobe.png',
    devices: '2 thiết bị',
    features: 'Full APP'
  },
  {
    name: 'Adobe Full APP - 1 năm 2 thiết bị',
    price: 550000,
    description: 'Tài khoản Adobe Creative Cloud đầy đủ tất cả ứng dụng',
    service: 'Adobe',
    duration: '1 năm',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/adobe.png',
    devices: '2 thiết bị',
    features: 'Full APP'
  },

  // GOOGLE DRIVE AI ULTRA 30TB VEO 3
  {
    name: 'Google AI Pro 2TB+ VEO3 1000 Credits - 1 tháng',
    price: 25000,
    description: 'Google AI Pro với 2TB storage và 1000 VEO3 Credits',
    service: 'Google',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/google.png',
    features: '2TB + VEO3 1000 Credits'
  },
  {
    name: 'Combo 5 acc VEO 3 1000 Credits - 1 tháng',
    price: 85000,
    description: 'Combo 5 tài khoản Google AI với VEO3 1000 Credits mỗi acc',
    service: 'Google',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/google.png',
    features: '5 acc VEO3 1000 Credits'
  },
  {
    name: 'Combo 10 acc VEO 3 1000 Credits - 1 tháng',
    price: 140000,
    description: 'Combo 10 tài khoản Google AI với VEO3 1000 Credits mỗi acc',
    service: 'Google',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/google.png',
    features: '10 acc VEO3 1000 Credits'
  },
  {
    name: 'Combo 30 acc VEO 3 1000 Credits - 1 tháng',
    price: 350000,
    description: 'Combo 30 tài khoản Google AI với VEO3 1000 Credits mỗi acc',
    service: 'Google',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/google.png',
    features: '30 acc VEO3 1000 Credits'
  },
  {
    name: 'Combo 50 acc VEO 3 1000 Credits - 1 tháng',
    price: 530000,
    description: 'Combo 50 tài khoản Google AI với VEO3 1000 Credits mỗi acc',
    service: 'Google',
    duration: '1 tháng',
    stock: 100,
    note: 'bảo hành trong quá trình sử dụng',
    image: '/images/google.png',
    features: '50 acc VEO3 1000 Credits'
  }
];

// Dữ liệu services
const services = [
  { name: 'YouTube', image: '/images/youtube.png' },
  { name: 'Netflix', image: '/images/netflix.png' },
  { name: 'CapCut', image: '/images/capcut.png' },
  { name: 'Canva', image: '/images/canva.png' },
  { name: 'ChatGPT', image: '/images/chatgpt.png' },
  { name: 'Spotify', image: '/images/spotify.png' },
  { name: 'Adobe', image: '/images/adobe.png' },
  { name: 'Google', image: '/images/google.png' }
];

async function seedProducts() {
  try {
    await connectMongo();
    
    // Xóa tất cả dữ liệu cũ
    await Product.deleteMany({});
    await Service.deleteMany({});
    console.log('Đã xóa tất cả dữ liệu cũ');
    
    // Thêm services trước
    const insertedServices = await Service.insertMany(services);
    console.log(`✅ Đã thêm ${insertedServices.length} services vào database`);
    
    // Thêm sản phẩm mới
    const insertedProducts = await Product.insertMany(newProducts);
    console.log(`✅ Đã thêm ${insertedProducts.length} sản phẩm mới vào database`);
    
    // Hiển thị thống kê theo service
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    console.log('\n📊 Thống kê sản phẩm theo dịch vụ:');
    stats.forEach(stat => {
      console.log(`${stat._id}: ${stat.count} sản phẩm | Giá: ${stat.minPrice.toLocaleString('vi-VN')}đ - ${stat.maxPrice.toLocaleString('vi-VN')}đ | TB: ${Math.round(stat.avgPrice).toLocaleString('vi-VN')}đ`);
    });
    
    console.log('\n🎉 Seed database thành công!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Lỗi khi seed database:', error);
    process.exit(1);
  }
}

// Chạy script
seedProducts();
