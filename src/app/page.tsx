import Link from 'next/link';
import { getProducts } from '@/lib/products';
import Carousel from "@/components/Carousel";
import CarouselCategories from '@/components/CarouselCategories';

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
  } catch (error) {
    console.error('Lỗi khi tải sản phẩm:', error);
    return <div className="container mx-auto px-4 py-8 text-red-500">Lỗi khi tải sản phẩm. Vui lòng thử lại sau.</div>;
  }

  // Nhóm sản phẩm theo service
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.service]) {
      acc[product.service] = [];
    }
    acc[product.service].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Lấy sản phẩm có giá thấp nhất làm đại diện
  const representativeProducts = Object.entries(groupedProducts).map(([service, serviceProducts]) => {
    const minPriceProduct = serviceProducts.reduce((min, product) =>
      product.price < min.price ? product : min
    );
    return { service, product: minPriceProduct };
  });

  return (
    <div className="container mx-auto px-8 py-8">
       <Carousel />  {/* Carousel ở trên */}
       <CarouselCategories/>
      <h1 className="text-3xl  mb-8 text-center mt-10"><span className='font-bold'>SẢN PHẨM</span> BÁN CHẠY</h1>

      {/* Grid 4 cột */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto ">
        {representativeProducts.map(({ service, product }) => (
          <Link key={service} href={`/products/${product._id}`} className="block">
            <div className="border no-border rounded-2xl shadow-lg hover:shadow-xl transition-shadow bg-white flex w-[280px] h-[150px]">

              {/* Ảnh bên trái */}
              <div className="w-[140px] h-[150px] overflow-hidden rounded-l-2xl">
                <img
                  src={product.image || '/placeholder-image.png'}
                  alt={service}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nội dung bên phải */}
              <div className="w-[140px] h-[150px] flex flex-col justify-between p-2 text-sm">
                <h2 className="font-semibold leading-snug line-clamp-2">
                  Mua Tài khoản {service} Premium
                </h2>

                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-2">Giải trí</span>
                  <span className="ml-auto flex items-center gap-1">👥 {product.sold || 0}</span>
                </div>

                <p className="text-red-500 font-bold text-base">
                  {product.price.toLocaleString('vi-VN')}đ
                </p>

                <div className="flex justify-end">
                  <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow text-xs">
                    🛒
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}