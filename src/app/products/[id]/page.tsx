'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Clock, Shield, ArrowLeft, MessageCircle, Star, Users } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface Product {
  _id: string;
  name: string;
  service: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  duration?: string;
  features?: string;
  note?: string;
  createdAt: string;
}

interface Variant {
  _id: string;
  productId?: string;
  name?: string;
  duration?: string;
  price: number;
  features?: string;
  note?: string;
}

interface Comment {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const { data: session } = useSession();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Dịch vụ tuyệt vời! Tài khoản hoạt động ổn định, hỗ trợ nhiệt tình.'
    },
    {
      id: 2,
      user: 'Trần Thị B',
      rating: 5,
      comment: 'Giá cả hợp lý, chất lượng tốt. Sẽ tiếp tục ủng hộ shop.'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const fetchVariants = useCallback(async () => {
    if (!product?.service) return;
    
    try {
      const response = await fetch(`/api/products/variants?service=${encodeURIComponent(product.service)}`);
      if (response.ok) {
        const data = await response.json();
        setVariants(data);
        if (data.length > 0) {
          const currentVariant = data.find((v: Variant) => v._id === product._id);
          setSelectedVariant(currentVariant || data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching variants:', error);
    }
  }, [product]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    if (product) {
      fetchVariants();
    }
  }, [product, fetchVariants]);

  const extractDurationFromName = (name: string) => {
    const match = name.match(/(\d+)\s*(tháng|năm)/i);
    if (match) {
      return `${match[1]} ${match[2].toLowerCase()}`;
    }
    return name;
  };

  const handleVariantChange = (variantId: string) => {
    const variant = variants.find(v => v._id === variantId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: 'Khách hàng',
        rating: 5,
        comment: newComment.trim()
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleAddToCart = () => {
    if (!session) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      router.push('/auth/signin');
      return;
    }

    if (!product || !selectedVariant) return;

    const cartItem = {
      id: `${product._id}-${selectedVariant._id}`,
      productId: product._id,
      productName: product.name,
      service: product.service,
      variant: {
        id: selectedVariant._id,
        duration: selectedVariant.duration || (selectedVariant.name ? extractDurationFromName(selectedVariant.name) : ''),
        price: selectedVariant.price,
        features: selectedVariant.features
      },
      quantity: 1,
      image: product.image
    };

    addItem(cartItem);
    alert('Đã thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    if (!session) {
      alert('Vui lòng đăng nhập để mua hàng!');
      router.push('/auth/signin');
      return;
    }

    if (!product || !selectedVariant) {
      alert('Vui lòng chọn gói dịch vụ trước khi mua!');
      return;
    }

    handleAddToCart();
    alert('Đang chuyển đến trang thanh toán...');
  };

  const getProductDescription = (service: string) => {
    const descriptions: { [key: string]: string } = {
      'Netflix': `🎬 Trải nghiệm giải trí không giới hạn với Netflix Premium

🌟 Tính năng nổi bật:
• Xem phim chất lượng Ultra HD 4K với HDR
• Truy cập toàn bộ thư viện phim và series độc quyền 
• Không quảng cáo, xem offline trên mọi thiết bị
• Hỗ trợ xem đồng thời trên 4 thiết bị khác nhau
• Âm thanh Dolby Atmos cho trải nghiệm sống động

📱 Tương thích với:
Smart TV, Laptop, Điện thoại, Máy tính bảng, Chromecast, Apple TV

🔒 Bảo hành & Hỗ trợ:
• Bảo hành 100% trong suốt thời gian sử dụng
• Thay thế ngay lập tức nếu có sự cố
• Hỗ trợ kỹ thuật 24/7 qua Zalo/Telegram
• Hướng dẫn cài đặt chi tiết cho người mới

💡 Lưu ý quan trọng:
- Tài khoản được chia sẻ an toàn, không ảnh hưởng đến trải nghiệm
- Không thay đổi thông tin tài khoản
- Liên hệ ngay khi gặp vấn đề để được hỗ trợ`,

      'YouTube': `🎵 Thưởng thức YouTube không giới hạn với Premium

🌟 Tính năng đặc biệt:
• Xem video không quảng cáo trên tất cả nền tảng
• Tải video offline cho iPhone và Android  
• Phát video khi tắt màn hình (Background Play)
• Truy cập YouTube Music Premium miễn phí
• Chất lượng video cao nhất có thể

🎶 YouTube Music Premium bao gồm:
• 70+ triệu bài hát chất lượng cao
• Tải nhạc offline không giới hạn
• Phát nhạc khi tắt màn hình
• Không quảng cáo trong khi nghe nhạc

📱 Hỗ trợ thiết bị:
iPhone, Android, Smart TV, Desktop, Tablet

🔒 Cam kết chất lượng:
• Tài khoản chính chủ, không chia sẻ
• Bảo hành đổi mới trong 24h nếu lỗi
• Hỗ trợ cài đặt miễn phí
• Đội ngũ CSKH online 24/7

✨ Đặc biệt:
- Tài khoản riêng tư, bảo mật tuyệt đối
- Có thể thay đổi mật khẩu theo ý muốn
- Tặng kèm hướng dẫn sử dụng chi tiết`,

      'Spotify': `🎵 Âm nhạc không giới hạn với Spotify Premium

🌟 Tính năng vượt trội:
• Hơn 100 triệu bài hát chất lượng cao
• Tải nhạc offline trên mọi thiết bị
• Bỏ qua quảng cáo hoàn toàn
• Chất lượng âm thanh Very High (320kbps)
• Phát nhạc theo thứ tự tùy ý

🎧 Trải nghiệm đặc biệt:
• Playlist được cá nhân hóa thông minh
• Khám phá nhạc mới phù hợp sở thích
• Podcast premium độc quyền
• Crossfade và Gapless playback
• Lyrics hiển thị real-time

📱 Đa nền tảng:
iOS, Android, Windows, macOS, Smart Speaker, Car Play

🔒 Bảo đảm chất lượng:
• Tài khoản Premium chính thống
• Không bị gián đoạn dịch vụ
• Bảo hành 1 đổi 1 nếu có lỗi
• Support 24/7 qua Zalo

🎁 Ưu đãi đặc biệt:
- Setup miễn phí cho khách hàng mới
- Hướng dẫn tối ưu hóa trải nghiệm
- Tư vấn playlist theo sở thích`,

      'ChatGPT': `🤖 Trí tuệ nhân tạo tiên tiến với ChatGPT Plus

🌟 Tính năng Premium:
• Truy cập GPT-4 với độ chính xác cao nhất
• Phản hồi nhanh hơn gấp 3 lần phiên bản miễn phí
• Sử dụng không giới hạn thậm chí lúc cao điểm
• DALL-E 3 tạo hình ảnh AI miễn phí
• Advanced Data Analysis và Code Interpreter

🧠 Khả năng vượt trội:
• Xử lý văn bản phức tạp dài hàng nghìn từ
• Phân tích dữ liệu và tạo biểu đồ
• Viết code, debug và giải thích thuật toán
• Dịch thuật chuyên nghiệp đa ngôn ngữ
• Tạo nội dung sáng tạo: thơ, truyện, kịch bản

💼 Ứng dụng thực tế:
• Hỗ trợ công việc văn phòng, học tập
• Tư vấn kinh doanh và marketing
• Hỗ trợ lập trình và phát triển phần mềm
• Nghiên cứu và phân tích thông tin

🔒 Bảo mật & Hỗ trợ:
• Tài khoản cá nhân, bảo mật hoàn toàn
• Lịch sử chat được lưu trữ riêng tư
• Hỗ trợ kỹ thuật 24/7
• Bảo hành thay thế ngay lập tức`,

      'Canva': `🎨 Thiết kế chuyên nghiệp với Canva Pro

🌟 Công cụ thiết kế toàn diện:
• Hơn 420,000+ template premium chất lượng cao
• 100+ triệu ảnh, video, âm thanh stock premium
• Magic Resize: thay đổi kích thước thiết kế 1 click
• Background Remover: xóa phông nền tự động
• Brand Kit: quản lý thương hiệu chuyên nghiệp

✨ Tính năng AI tiên tiến:
• Magic Design: tạo thiết kế từ ý tưởng
• Magic Write: viết nội dung AI
• Magic Eraser: xóa đối tượng khỏi ảnh
• Magic Edit: chỉnh sửa ảnh thông minh

📁 Quản lý dự án:
• Lưu trữ cloud 1TB cho tất cả thiết kế
• Làm việc nhóm với 5 thành viên
• Chia sẻ và comment trực tiếp
• Tải xuống chất lượng cao, PDF print-ready

🎯 Phù hợp cho:
• Designer, Marketer, Content Creator
• Doanh nghiệp nhỏ và vừa
• Học sinh, sinh viên
• Freelancer và Agency

🔒 Cam kết dịch vụ:
• Tài khoản Pro chính thống từ Canva
• Bảo hành đổi mới 24/7
• Hướng dẫn sử dụng từ A-Z
• Support tiếng Việt chuyên nghiệp`,

      'CapCut': `🎬 Chỉnh sửa video chuyên nghiệp với CapCut Pro

🌟 Tính năng editing mạnh mẽ:
• Export video 4K không watermark
• Hàng nghìn effect và filter premium
• Chroma key (xóa phông xanh) chuyên nghiệp
• Multi-layer editing: 10+ track âm thanh/video
• Keyframe animation chi tiết

🎵 Thư viện nội dung khổng lồ:
• Triệu bài nhạc bản quyền miễn phí
• Sound effects và ambient sounds
• Stickers và text animations độc đáo
• Template có sẵn cho mọi thể loại

🤖 AI Features:
• Auto captions: tạo phụ đề tự động
• Voice changer: thay đổi giọng nói
• Body effects: hiệu ứng cơ thể ảo
• Background removal cho video

📱 Đa nền tảng:
• Mobile: iOS và Android
• Desktop: Windows và macOS
• Sync đồng bộ giữa các thiết bị

🔒 Ưu đãi Premium:
• Tài khoản Pro chính chủ ByteDance
• Cloud storage 1TB cho project
• Bảo hành 1-1 nếu có vấn đề
• Hướng dẫn editing từ cơ bản đến nâng cao

🎁 Bonus:
- Template trending TikTok/Instagram
- Preset màu điện ảnh chuyên nghiệp
- Font tiếng Việt đa dạng`
    };

    return descriptions[service] || `🎯 Dịch vụ Premium đa dạng

🌟 Cam kết chất lượng:
• Tài khoản chính thống từ nhà phát hành
• Bảo hành toàn diện trong suốt thời gian sử dụng
• Hỗ trợ kỹ thuật 24/7 qua Zalo/Telegram
• Thay thế ngay lập tức nếu có sự cố

🔒 Bảo mật & An toàn:
• Tài khoản được chia sẻ an toàn
• Không ảnh hưởng đến trải nghiệm sử dụng
• Bảo vệ thông tin khách hàng tuyệt đối
• Tuân thủ điều khoản sử dụng của nhà cung cấp`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-white">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-400 mt-2">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const currentDuration = selectedVariant?.duration || 
                         (selectedVariant?.name ? extractDurationFromName(selectedVariant.name) : '') ||
                         product.duration || '1 tháng';
  const currentFeatures = selectedVariant?.features || product.features;
  const currentNote = selectedVariant?.note || product.note || 'Bảo hành 1-1 nếu có lỗi';

  return (
    <>
      {/* Background Blur Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background with Blur Effect */}
        <div className="absolute inset-0">
          {/* Product image overlay with blur - tăng opacity để thấy rõ hơn */}
          <div className="absolute inset-0 opacity-60">
            <Image
              src={product.image || '/images/placeholder.png'}
              alt="Background"
              fill
              className="object-cover blur-2xl scale-105"
              priority
            />
          </div>
          
          {/* Simple dark overlay for readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Breadcrumb */}
        <div className="flex items-center justify-between p-4 text-white">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="hover:text-blue-300 transition-colors">Trang chủ</Link>
              <span className="text-gray-400">→</span>
              <Link href="/products" className="hover:text-blue-300 transition-colors">Sản phẩm</Link>
              <span className="text-gray-400">→</span>
              <span className="text-blue-300">Mua Tài khoản {product.service} Premium</span>
            </nav>
          </div>

          {/* Customer Reviews & Sold Count */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>178 Đánh giá từ khách hàng</span>
              <span className="text-blue-300">→</span>
            </div>
            <div className="flex items-center space-x-1">
              <ShoppingCart size={16} />
              <span>34436 Đã bán</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield size={16} />
              <span className="text-green-400">Chính sách bảo hành</span>
            </div>
          </div>
        </div>

        {/* Main Product Card */}
        <div className="flex items-center justify-center px-6 py-2">
          <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Product Image */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={product.image || '/images/placeholder.png'}
                  alt={product.service}
                  fill
                  className="object-cover"
                  priority
                />
               
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="text-white space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">Mua Tài khoản {product.service} Premium</h1>
                <div className="flex items-baseline space-x-3 mb-4">
                  <span className="text-3xl font-bold">{currentPrice.toLocaleString('vi-VN')}đ</span>
                  <span className="text-gray-400 line-through">  {(currentPrice + 50000).toLocaleString('vi-VN')}đ</span>
                </div>
                <p className="text-gray-300 text-lg mb-4">
                  {currentFeatures || product.description}
                </p>
              </div>

              {/* Duration & Price Selection - Original Style */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Chọn gói thời hạn:</h3>
                <select
                  value={selectedVariant?._id || ''}
                  onChange={(e) => handleVariantChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                >
                  {variants.map((variant) => (
                    <option key={variant._id} value={variant._id}>
                      {variant.duration || (variant.name ? extractDurationFromName(variant.name) : variant.name)} - {variant.price.toLocaleString('vi-VN')}đ
                      {variant.features && ` (${variant.features})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Display */}
              <div className="bg-green-500/20 backdrop-blur-md p-6 rounded-lg border border-green-400/30">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-green-400">
                    {currentPrice.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-gray-300">/ {currentDuration}</span>
                </div>
                <div className="flex items-center mt-2 text-green-400">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-sm">{currentNote}</span>
                </div>
              </div>

              {/* Product Info Grid */}
              <div className="grid grid-cols-2 gap-4 pb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Thời hạn</p>
                    <p className="font-semibold text-white">{currentDuration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Còn lại</p>
                    <p className="font-semibold text-white">{product.stock} tài khoản</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={handleBuyNow}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Mua Ngay</span>
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" />
                  </svg>
                  <span>Thêm vào giỏ</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-400 pb-2">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Bảo hành toàn diện
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Đánh giá 5 sao
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Background Blur Section */}

      {/* White Background Section - Product Info Grid and below */}
      <div className="bg-white">
        {/* Bottom Info Cards */}
        <div className="px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6 text-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                      <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-600">Giao hàng</h3>
                  <p className="text-sm text-gray-600">Gửi tài khoản qua email</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-600">Thời gian giao hàng</h3>
                  <p className="text-sm text-gray-600">Ngay lập tức</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-600">Bảo hành</h3>
                  <p className="text-sm text-gray-600">Trọn gói đăng ký</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section - nền trắng */}
      <div className="bg-white px-6 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg border">
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-4 font-medium text-sm flex-1 transition-colors ${
                    activeTab === 'description'
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  📝 Mô tả sản phẩm
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 font-medium text-sm flex-1 transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  ⭐ Đánh giá ({comments.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8 bg-white">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed text-base">
                      {getProductDescription(product.service)}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    {/* Existing Comments */}
                    <div className="space-y-6 mb-8">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {comment.user.charAt(0)}
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900">{comment.user}</span>
                              <div className="flex mt-1">
                                {[...Array(comment.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 ml-13 text-base">{comment.comment}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Comment */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Để lại đánh giá của bạn</h3>
                      <div className="space-y-4">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800 placeholder-gray-500"
                          rows={4}
                        />
                        <button
                          onClick={handleAddComment}
                          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                        >
                          Gửi đánh giá
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of White Background Section */}
    </>
  );
}