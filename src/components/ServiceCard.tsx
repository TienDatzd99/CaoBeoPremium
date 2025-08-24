// components/ServiceCard.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import BuyButton from './BuyButton';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  service: string;
  duration: string;
  stock: number;
}

export default function ServiceCard({ service, products }: { service: string; products: Product[] }) {
  // Khởi tạo với giá trị từ props để khớp server-side
  const [selectedProductId, setSelectedProductId] = useState(products[0]?._id || '');
  const [selectedPrice, setSelectedPrice] = useState(products[0]?.price || 0);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = products.find((p) => p._id === e.target.value);
    if (selected) {
      setSelectedProductId(selected._id);
      setSelectedPrice(selected.price);
    }
  };

  // Đảm bảo HTML khớp với server-side
  if (!products.length) {
    return <div>Không có sản phẩm cho {service}</div>;
  }

  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-semibold mb-4">{service}</h2>
      <p className="mb-4 text-gray-600">{products[0].description.split(',')[0]}</p>
      <select
        onChange={handleSelectChange}
        className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedProductId} // Đồng bộ với state
      >
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.duration} - {product.price.toLocaleString('vi-VN')} VND
          </option>
        ))}
      </select>
      <p className="font-bold mb-4 text-lg text-green-600">Giá: {selectedPrice.toLocaleString('vi-VN')} VND</p>
      
      <div className="space-y-3">
        <Link 
          href={`/products/${selectedProductId}`}
          className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Xem chi tiết
        </Link>
        <BuyButton productId={selectedProductId} price={selectedPrice} />
      </div>
    </div>
  );
}