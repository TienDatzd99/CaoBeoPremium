'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Nâng cấp tài khoản Vison VIP 6 tháng',
    price: 299000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Xem phim',
    rating: 5,
    discount: null
  },
  {
    id: 2,
    name: 'Nâng cấp tài khoản Qobuz Studio chỉ...',
    price: 350000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Nghệ nhạc',
    rating: 5,
    discount: null
  },
  {
    id: 3,
    name: 'Tài khoản Pornhub Premium 12 tháng',
    price: 420000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Yoga',
    rating: 5,
    discount: null
  },
  {
    id: 4,
    name: 'Nâng cấp chính chủ tài khoản...',
    price: 149000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Học tập',
    subcategory: 'Học tập',
    rating: 5,
    discount: null
  },
  {
    id: 5,
    name: 'Tài khoản Vfxbangers.com',
    price: 499000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Mã kích hoạt',
    subcategory: 'Mã kích hoạt',
    rating: 5,
    discount: null
  },
  {
    id: 6,
    name: 'Nâng cấp tài khoản Deezer Premium...',
    price: 1999000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Nghệ nhạc',
    rating: 5,
    discount: null
  },
  {
    id: 7,
    name: 'Tài khoản HBO Max 01 User',
    price: 45000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Xem phim',
    rating: 5,
    discount: null
  },
  {
    id: 8,
    name: 'Tài khoản NBA League Pass 12...',
    price: 449000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Thể thao',
    rating: 5,
    discount: null
  },
  {
    id: 9,
    name: 'Tài khoản Netflix Extra Member |...',
    price: 79000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Xem phim',
    rating: 5,
    discount: null
  },
  {
    id: 10,
    name: 'Nâng cấp tài khoản FPT Play chính chủ',
    price: 79000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Xem phim',
    rating: 5,
    discount: null
  },
  {
    id: 11,
    name: 'Nâng cấp Spotify Family Premium...',
    price: 690000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Nghệ nhạc',
    rating: 5,
    discount: null
  },
  {
    id: 12,
    name: 'Nâng cấp tài khoản Apple TV+ chính...',
    price: 1499000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Xem phim',
    rating: 5,
    discount: null
  },
  {
    id: 13,
    name: 'Mua Tài khoản Netflix Premium',
    price: 10000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Xem phim',
    rating: 5,
    discount: 88
  },
  {
    id: 14,
    name: 'Tidal HiFi Plus – Hội nghĩ âm...',
    price: 89000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Nghệ nhạc',
    rating: 5,
    discount: null
  },
  {
    id: 15,
    name: 'Tài khoản Netflix Premium Full 5...',
    price: 239000,
    originalPrice: null,
    image: '/public/images/netflix.png',
    category: 'Giải trí',
    subcategory: 'Xem phim',
    rating: 5,
    discount: 18
  }
];

const categories = [
  { name: 'Bảo mật', count: 68, subcategories: [] },
  { name: 'Game', count: 11, subcategories: [] },
  { name: 'Gamekey', count: 203, subcategories: [] },
  { 
    name: 'Giải trí', 
    count: 75, 
    subcategories: [
      { name: 'Dance', count: 0 },
      { name: 'Nghệ nhạc', count: 0 },
      { name: 'Thể thao', count: 0 },
      { name: 'Xem phim', count: 0 },
      { name: 'Yoga', count: 0 }
    ]
  },
  { name: 'Học tập', count: 61, subcategories: [] },
  { name: 'Làm việc', count: 84, subcategories: [] },
  { name: 'Mã kích hoạt', count: 217, subcategories: [] },
  { name: 'Năng cấp', count: 29, subcategories: [] },
  { name: 'Sức khỏe', count: 18, subcategories: [] },
  { name: 'Tài khoản', count: 174, subcategories: [] }
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1499000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [expandedCategory, setExpandedCategory] = useState<string>('Giải trí');

  useEffect(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubcategory, priceRange, selectedRating]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 -mt-[160px] pt-[160px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Giải trí</h1>
              <nav className="flex items-center space-x-2 text-sm opacity-90">
                <Link href="/" className="hover:underline">TRANG CHỦ</Link>
                <span>/</span>
                <span>GIẢI TRÍ</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <select className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70">
                <option>Thứ tự theo điểm đánh giá</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Mới nhất</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-lg p-6 h-fit">
            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-orange-200">
                Danh mục sản phẩm
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <div 
                        className="flex items-center flex-1"
                        onClick={() => {
                          setSelectedCategory(category.name === selectedCategory ? '' : category.name);
                          if (category.subcategories.length > 0) {
                            setExpandedCategory(expandedCategory === category.name ? '' : category.name);
                          }
                        }}
                      >
                        <span className={`text-sm ${selectedCategory === category.name ? 'text-orange-600 font-medium' : 'text-gray-700'}`}>
                          {category.name}
                        </span>
                        <span className="ml-auto text-xs text-gray-400">({category.count})</span>
                      </div>
                      {category.subcategories.length > 0 && (
                        <button
                          onClick={() => setExpandedCategory(expandedCategory === category.name ? '' : category.name)}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          {expandedCategory === category.name ? '−' : '+'}
                        </button>
                      )}
                    </div>
                    
                    {/* Subcategories */}
                    {expandedCategory === category.name && category.subcategories.length > 0 && (
                      <div className="ml-4 mt-2 space-y-1">
                        {category.subcategories.map((sub) => (
                          <div 
                            key={sub.name}
                            className="flex items-center justify-between p-2 hover:bg-orange-50 rounded cursor-pointer"
                            onClick={() => {
                              setSelectedSubcategory(sub.name === selectedSubcategory ? '' : sub.name);
                              setSelectedCategory(category.name);
                            }}
                          >
                            <span className={`text-sm ${selectedSubcategory === sub.name ? 'text-orange-600 font-medium' : 'text-orange-500'}`}>
                              {sub.name}
                            </span>
                            <span className="text-xs text-gray-400">({sub.count})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-orange-200">
                Lọc theo giá
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="1499000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>0đ</span>
                    <span>1,499,000đ</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Giá:</span>
                  <span className="text-sm font-medium text-orange-600">
                    0đ - {formatPrice(priceRange[1])}
                  </span>
                </div>
                <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                  LỌC
                </button>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-orange-200">
                Đánh giá
              </h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div 
                    key={rating}
                    className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => {}}
                      className="text-orange-500"
                    />
                    <div className="flex items-center">
                      {renderStars(rating)}
                      <span className="ml-2 text-sm text-gray-600">({rating === 5 ? '26' : '0'})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Products Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Sản phẩm mới</h3>
              <div className="space-y-3">
                {mockProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                    <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                      <Image
                        src="/images/netflix.png"
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 truncate">{product.name}</p>
                      <p className="text-sm font-medium text-orange-600">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                        -{product.discount}%
                      </div>
                    )}
                    <Image
                      src="/images/netflix.png"
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 leading-5">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-2">
                      {renderStars(product.rating)}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-orange-600">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                      </svg>
                      <span>Mua ngay</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50">
                  ←
                </button>
                <button className="px-3 py-2 bg-orange-500 text-white rounded-lg">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">2</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">3</button>
                <span className="px-2">...</span>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">10</button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
