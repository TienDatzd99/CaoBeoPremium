'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Star, 
  ShoppingCart, 
  Clock, 
  Users, 
  Shield 
} from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  service: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  createdAt: string;
}

interface Variant {
  _id: string;
  productId: string;
  duration: string;
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
  const productId = params.id as string;
  
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

  useEffect(() => {
    fetchProduct();
    fetchVariants();
  }, [productId]);

  const fetchProduct = async () => {
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
  };

  const fetchVariants = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/variants`);
      if (response.ok) {
        const data = await response.json();
        setVariants(data);
        if (data.length > 0) {
          setSelectedVariant(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching variants:', error);
    }
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

  const getProductDescription = (service: string) => {
    const descriptions: { [key: string]: string } = {
      'Netflix': ` Trải nghiệm giải trí không giới hạn với Netflix Premium\n\n Tính năng nổi bật:\n Xem phim chất lượng Ultra HD 4K với HDR\n Truy cập toàn bộ thư viện phim và series độc quyền\n Không quảng cáo, xem offline trên mọi thiết bị\n Hỗ trợ xem đồng thời trên 4 thiết bị khác nhau\n Âm thanh Dolby Atmos cho trải nghiệm sống động\n\n Tương thích với:\nSmart TV, Laptop, Điện thoại, Máy tính bảng, Chromecast, Apple TV\n\n Bảo hành & Hỗ trợ:\n Bảo hành 100% trong suốt thời gian sử dụng\n Thay thế ngay lập tức nếu có sự cố\n Hỗ trợ kỹ thuật 24/7 qua Zalo/Telegram\n Hướng dẫn cài đặt chi tiết cho người mới\n\n Lưu ý quan trọng:\n- Tài khoản được chia sẻ an toàn, không ảnh hưởng đến trải nghiệm\n- Không thay đổi thông tin tài khoản\n- Liên hệ ngay khi gặp vấn đề để được hỗ trợ`,
      'YouTube': ` Thưởng thức YouTube không giới hạn với Premium\n\n Tính năng đặc biệt:\n Xem video không quảng cáo trên tất cả nền tảng\n Tải video offline cho iPhone và Android\n Phát video khi tắt màn hình (Background Play)\n Truy cập YouTube Music Premium miễn phí\n Chất lượng video cao nhất có thể\n\n YouTube Music Premium bao gồm:\n 70+ triệu bài hát chất lượng cao\n Tải nhạc offline không giới hạn\n Phát nhạc khi tắt màn hình\n Không quảng cáo trong khi nghe nhạc\n\n Hỗ trợ thiết bị:\niPhone, Android, Smart TV, Desktop, Tablet\n\n Cam kết chất lượng:\n Tài khoản chính chủ, không chia sẻ\n Bảo hành đổi mới trong 24h nếu lỗi\n Hỗ trợ cài đặt miễn phí\n Đội ngũ CSKH online 24/7\n\n Đặc biệt:\n- Tài khoản riêng tư, bảo mật tuyệt đối\n- Có thể thay đổi mật khẩu theo ý muốn\n- Tặng kèm hướng dẫn sử dụng chi tiết`
    };
    return descriptions[service] || ` Dịch vụ Premium đa dạng\n\n Cam kết chất lượng:\n Tài khoản chính thống từ nhà phát hành\n Bảo hành toàn diện trong suốt thời gian sử dụng\n Hỗ trợ kỹ thuật 24/7 qua Zalo/Telegram\n Thay thế ngay lập tức nếu có sự cố`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600 mt-2">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const currentDuration = selectedVariant?.duration || '1 tháng';
  const currentFeatures = selectedVariant?.features;
  const currentNote = selectedVariant?.note || 'Bảo hành 1-1 nếu có lỗi';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-500 hover:text-blue-600">
                Trang chủ
              </a>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">{product.service}</span>
            </li>
          </ol>
        </nav>

        {/* Main product section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left - Product Image - Full Frame */}
            <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.image || '/images/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />
            </div>

            {/* Right - Product Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                  {product.service}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.service} Premium
                </h1>
                <p className="text-gray-600 text-lg">
                  {currentFeatures || product.description}
                </p>
              </div>

              {/* Duration & Price Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Chọn gói thời hạn:</h3>
                <select
                  value={selectedVariant?._id || ''}
                  onChange={(e) => handleVariantChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {variants.map((variant) => (
                    <option key={variant._id} value={variant._id}>
                      {variant.duration} - {variant.price.toLocaleString('vi-VN')}đ
                      {variant.features && ` (${variant.features})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Display */}
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-green-600">
                    {currentPrice.toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-gray-500">/ {currentDuration}</span>
                </div>
                <div className="flex items-center mt-2 text-green-600">
                  <Shield className="w-4 h-4 mr-1" />
                  <span className="text-sm">{currentNote}</span>
                </div>
              </div>

              {/* Product Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Thời hạn</p>
                    <p className="font-semibold">{currentDuration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Còn lại</p>
                    <p className="font-semibold">{product.stock} tài khoản</p>
                  </div>
                </div>
              </div>

              {/* Buy Button */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Mua ngay - {currentPrice.toLocaleString('vi-VN')}đ</span>
              </button>

              {/* Trust badges */}
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
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

        {/* Tabs Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 font-medium text-sm flex-1 ${
                activeTab === 'description'
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
               Mô tả sản phẩm
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 font-medium text-sm flex-1 ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
               Đánh giá ({comments.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
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
                      <p className="text-gray-700 ml-13">{comment.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold mb-4">Để lại đánh giá của bạn</h3>
                  <div className="space-y-4">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
  );
}