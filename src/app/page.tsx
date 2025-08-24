import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/products';
import Carousel from "@/components/Carousel";
import CarouselCategories from '@/components/CarouselCategories';
import StatsCounter from '@/components/StatsCounter';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  service: string;
  duration: string;
  stock: number;
  image: string;
  sold?: number;
}

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await getProducts();
    console.log('Products loaded:', products.length);
    console.log('First product:', products[0]);
  } catch (error) {
    console.error('Lỗi khi tải sản phẩm:', error);
    return <div className="container mx-auto px-4 py-8 text-red-500">Lỗi khi tải sản phẩm. Vui lòng thử lại sau.</div>;
  }

  // Nếu không có sản phẩm
  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-8 py-8">
        <h1 className="text-3xl mb-8 text-center">Không có sản phẩm nào</h1>
      </div>
    );
  }

  // Nhóm sản phẩm theo service
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.service]) {
      acc[product.service] = [];
    }
    acc[product.service].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  console.log('Grouped products:', Object.keys(groupedProducts));

  // Lấy sản phẩm có giá thấp nhất làm đại diện
  const representativeProducts = Object.entries(groupedProducts).map(([service, serviceProducts]) => {
    const minPriceProduct = serviceProducts.reduce((min, product) =>
      product.price < min.price ? product : min
    );
    return { service, product: minPriceProduct };
  });

  console.log('Representative products:', representativeProducts.length);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 w-full max-w-none px-4 md:px-8 ">
        <Carousel />  {/* Carousel với Flickity */}
        <CarouselCategories />
        
        <h1 className="text-3xl md:text-4xl mb-8 text-center mt-10">
          <span className='font-bold text-gray-800 drop-shadow-sm'>SẢN PHẨM</span> 
          <span className='font-normal text-blue-600 drop-shadow-sm'> BÁN CHẠY</span>
        </h1>

        {/* Grid 4 cột như ban đầu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {representativeProducts.map(({ service, product }) => (
            <Link key={service} href={`/products/${product._id}`} className="block group">
              <div className="border border-white/20 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 backdrop-blur-md flex w-[280px] h-[150px] group-hover:scale-105 group-hover:border-blue-300/50 group-hover:bg-white relative overflow-hidden">

                {/* Ảnh bên trái */}
                <div className="w-[140px] h-[150px] overflow-hidden rounded-l-2xl relative">
                  <Image
                    src={product.image || '/placeholder-image.png'}
                    alt={service}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                </div>

                {/* Nội dung bên phải */}
                <div className="w-[140px] h-[150px] flex flex-col justify-between p-3 text-sm relative">
                  <h2 className="font-bold leading-snug line-clamp-2 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                    Mua Tài khoản {service} Premium
                  </h2>

                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-[10px]">Giải trí</span>
                    <span className="ml-auto flex items-center gap-1 text-green-600 font-medium">👥 {product.sold || 0}</span>
                  </div>

                  <p className="text-red-500 font-bold text-base drop-shadow-sm">
                    {product.price.toLocaleString('vi-VN')}đ
                  </p>

                  <div className="flex justify-end">
                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 rounded-full shadow-lg text-xs transition-all duration-300 group-hover:shadow-2xl group-hover:scale-110">
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-sm"
                      >
                        <path 
                          d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-300/10 to-transparent rounded-bl-full transform translate-x-4 -translate-y-4"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Section Khuyến mãi và Uy tín */}
      <section className="py-8 md:py-16 mt-16 relative z-10">
        <div className="w-full max-w-none px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Cột trái - Khuyến mãi */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden h-full flex items-center shadow-xl">
              <div className="relative z-10 flex-1">
                <h2 className="text-2xl md:text-3xl font-bold">
                  MUA HÀNG HÔM NAY{' '}
                  <span className="block text-3xl md:text-4xl mt-2 text-blue-100 drop-shadow-lg">
                    ƯU ĐÃI LỚN
                  </span>
                </h2>
              </div>
              
              {/* Animated promotional elements */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 text-blue-100 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="12s" repeatCount="indefinite"/>
                  </path>
                </svg>
              </div>
              
              {/* Floating discount elements */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-4 w-8 h-8 bg-blue-300/20 rounded-full animate-bounce"></div>
                <div className="absolute bottom-4 right-16 w-6 h-6 bg-white/15 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-32 w-4 h-4 bg-blue-200/30 rounded-full animate-ping"></div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/3 to-white/5"></div>
            </div>

            {/* Cột phải - Uy tín */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 h-full shadow-xl border border-gray-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* Cột con trái - Shield và text */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg
                        className="w-6 h-6 text-white drop-shadow-sm"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V17H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z">
                          <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite"/>
                        </path>
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent">
                      UY TÍN
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      AN TOÀN
                    </p>
                    <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-700 to-slate-600 bg-clip-text text-transparent">
                      NHANH CHÓNG
                    </p>
                  </div>
                </div>

                {/* Cột con phải - Mô tả */}
                <div className="flex flex-col justify-center relative">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                    TẤT CẢ SẢN PHẨM ĐỀU ĐƯỢC KIỂM TRA VÀ BẢO ĐẢM CHO QUÁ TRÌNH SỬ DỤNG ỔN ĐỊNH.
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-30 animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-gray-300 to-slate-300 rounded-full opacity-40 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <StatsCounter />
    </div>
  );
}