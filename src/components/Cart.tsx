'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard,
  LogIn 
} from 'lucide-react';
import Image from 'next/image';

export default function Cart() {
  const { data: session } = useSession();
  const router = useRouter();
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (id: string, change: number) => {
    const item = state.items.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  const handleCheckout = () => {
    if (!session) {
      alert('Vui lòng đăng nhập để thanh toán!');
      return;
    }
    // TODO: Implement checkout logic
    alert('Chức năng thanh toán đang được phát triển!');
  };

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <>
      {/* Cart Button */}
      <button
        data-cart-trigger
        onClick={() => setIsOpen(true)}
        className="relative bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-200"
      >
        <ShoppingCart className="w-6 h-6" />
        {state.itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
            {state.itemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed right-0 top-[180px] h-[calc(100vh-180px)] w-full max-w-md bg-white shadow-2xl z-40 border-l border-gray-200 overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Giỏ hàng ({state.itemCount})
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Login Required Message */}
            {!session && (
              <div className="p-6 border-b bg-blue-50">
                <div className="text-center">
                  <LogIn className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Đăng nhập để sử dụng giỏ hàng
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng và thanh toán
                  </p>
                  <button
                    onClick={handleSignIn}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Đăng nhập với Google</span>
                  </button>
                </div>
              </div>
            )}

            {/* Cart Items */}
            {session && (
              <div className="flex-1 overflow-y-auto p-6">
                {state.items.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Giỏ hàng của bạn đang trống</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          {/* Product Image */}
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white">
                            <Image
                              src={item.image || '/images/placeholder.png'}
                              alt={item.productName}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/images/placeholder.png';
                              }}
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {item.service} Premium
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {item.variant.duration}
                            </p>
                            {item.variant.features && (
                              <p className="text-gray-500 text-xs">
                                {item.variant.features}
                              </p>
                            )}
                            
                            {/* Price */}
                            <div className="mt-2">
                              <span className="font-bold text-green-600">
                                {item.variant.price.toLocaleString('vi-VN')}đ
                              </span>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              {(item.variant.price * item.quantity).toLocaleString('vi-VN')}đ
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            {session && state.items.length > 0 && (
              <div className="border-t p-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {state.total.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Thanh toán</span>
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
