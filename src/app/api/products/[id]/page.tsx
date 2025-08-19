'use client';
import { useState, useEffect } from 'react';
import { getProductById, getProductsByService } from '@/lib/products';
import BuyButton from '@/components/BuyButton';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  service: string;
  duration: string;
  stock: number;
  image?: string;
  note?: string;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [serviceProducts, setServiceProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await getProductById(params.id);
        const serviceProductsData = await getProductsByService(productData.service);
        setProduct(productData);
        setServiceProducts(serviceProductsData);
        setSelectedProductId(productData._id);
        setSelectedPrice(productData.price);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    }
    fetchData();
  }, [params.id]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = serviceProducts.find((p) => p._id === e.target.value);
    if (selected) {
      setSelectedProductId(selected._id);
      setSelectedPrice(selected.price);
    }
  };

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{product.service} Premium</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image || '/placeholder-image.png'}
          alt={product.service}
          className="w-full md:w-1/2 h-64 object-contain rounded"
        />
        <div className="w-full md:w-1/2">
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="font-bold text-red-500 mb-4">
            Lưu ý: {product.note || 'Tài khoản chia sẻ, không thay đổi mật khẩu, sử dụng đúng thiết bị.'}
          </p>
          <select
            onChange={handleSelectChange}
            className="border p-2 mb-4 w-full rounded"
            value={selectedProductId}
          >
            {serviceProducts.map((p) => (
              <option key={p._id} value={p._id}>
                {p.duration} - {p.price.toLocaleString('vi-VN')} VND
              </option>
            ))}
          </select>
          <p className="font-bold mb-4">Giá: {selectedPrice.toLocaleString('vi-VN')} VND</p>
          <BuyButton productId={selectedProductId} price={selectedPrice} />
        </div>
      </div>
    </div>
  );
}