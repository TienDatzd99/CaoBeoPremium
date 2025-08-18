// app/page.tsx
import ServiceCard from '@/components/ServiceCard';
import { getProducts } from '@/lib/products';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  service: string;
  duration: string;
  stock: number;
}

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error('Lỗi khi tải sản phẩm:', error);
    return <div>Lỗi khi tải sản phẩm. Vui lòng thử lại sau.</div>;
  }

  // Nhóm sản phẩm theo service
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.service]) {
      acc[product.service] = [];
    }
    acc[product.service].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cửa hàng tài khoản Premium</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(groupedProducts).map(([service, serviceProducts]) => (
          <ServiceCard key={service} service={service} products={serviceProducts} />
        ))}
      </div>
    </div>
  );
}