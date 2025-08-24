"use client";

import { useState, useEffect } from 'react';

interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  service: string;
  duration: string;
  stock: number;
  note: string;
}

interface Service {
  _id?: string;
  name: string;
  image: string;
}

interface User {
  _id: string;
  email: string;
  name?: string;
  provider: string;
  role: string;
  createdAt: string;
  image?: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'users'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    price: 0,
    description: '',
    service: '',
    duration: '',
    stock: 0,
    note: ''
  });
  const [newService, setNewService] = useState<Service>({
    name: '',
    image: ''
  });

  // Load dữ liệu
  useEffect(() => {
    loadProducts();
    loadServices();
    loadUsers();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Lỗi khi load sản phẩm:', error);
    }
  };

  const loadServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error('Lỗi khi load services:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Lỗi khi load users:', error);
    }
  };

  // Thêm sản phẩm mới
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      
      if (res.ok) {
        alert('✅ Thêm sản phẩm thành công!');
        setNewProduct({
          name: '',
          price: 0,
          description: '',
          service: '',
          duration: '',
          stock: 0,
          note: ''
        });
        loadProducts();
      } else {
        alert('❌ Lỗi khi thêm sản phẩm');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('❌ Lỗi khi thêm sản phẩm');
    }
  };

  // Thêm service mới
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });
      
      if (res.ok) {
        alert('✅ Thêm service thành công!');
        setNewService({ name: '', image: '' });
        loadServices();
      } else {
        alert('❌ Lỗi khi thêm service');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('❌ Lỗi khi thêm service');
    }
  };

  // Cập nhật quyền user
  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole })
      });
      
      if (res.ok) {
        alert('✅ Cập nhật quyền thành công!');
        loadUsers();
      } else {
        alert('❌ Lỗi khi cập nhật quyền');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('❌ Lỗi khi cập nhật quyền');
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">🔧 Trang Quản Trị</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'products'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          📦 Sản Phẩm
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'services'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          🏢 Dịch Vụ
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'users'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          👥 Người Dùng ({users.length})
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Form thêm sản phẩm */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-2xl font-bold mb-4">➕ Thêm Sản Phẩm Mới</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Giá (VND)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Service (Netflix, Spotify...)"
                  value={newProduct.service}
                  onChange={(e) => setNewProduct({...newProduct, service: e.target.value})}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Thời hạn (1 tháng, 3 tháng...)"
                  value={newProduct.duration}
                  onChange={(e) => setNewProduct({...newProduct, duration: e.target.value})}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Số lượng tồn kho"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Ghi chú"
                  value={newProduct.note}
                  onChange={(e) => setNewProduct({...newProduct, note: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <textarea
                placeholder="Mô tả sản phẩm"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full border p-2 rounded"
                rows={3}
                required
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Thêm Sản Phẩm
              </button>
            </form>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">📋 Danh Sách Sản Phẩm ({products.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Tên</th>
                    <th className="border border-gray-300 p-2">Giá</th>
                    <th className="border border-gray-300 p-2">Service</th>
                    <th className="border border-gray-300 p-2">Thời hạn</th>
                    <th className="border border-gray-300 p-2">Tồn kho</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td className="border border-gray-300 p-2">{product.name}</td>
                      <td className="border border-gray-300 p-2">{product.price.toLocaleString('vi-VN')}đ</td>
                      <td className="border border-gray-300 p-2">{product.service}</td>
                      <td className="border border-gray-300 p-2">{product.duration}</td>
                      <td className="border border-gray-300 p-2">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-2xl font-bold mb-4">➕ Thêm Service Mới</h2>
            <form onSubmit={handleAddService} className="space-y-4">
              <input
                type="text"
                placeholder="Tên service"
                value={newService.name}
                onChange={(e) => setNewService({...newService, name: e.target.value})}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="URL hình ảnh"
                value={newService.image}
                onChange={(e) => setNewService({...newService, image: e.target.value})}
                className="w-full border p-2 rounded"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Thêm Service
              </button>
            </form>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">📋 Danh Sách Services ({services.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map(service => (
                <div key={service._id} className="border p-4 rounded">
                  <h3 className="font-bold">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.image}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">👥 Quản Lý Người Dùng ({users.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Avatar</th>
                    <th className="border border-gray-300 p-2">Tên</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Provider</th>
                    <th className="border border-gray-300 p-2">Quyền</th>
                    <th className="border border-gray-300 p-2">Ngày tạo</th>
                    <th className="border border-gray-300 p-2">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td className="border border-gray-300 p-2">
                        {user.image && (
                          <img src={user.image} alt="Avatar" className="w-8 h-8 rounded-full" />
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">{user.name || 'N/A'}</td>
                      <td className="border border-gray-300 p-2">{user.email}</td>
                      <td className="border border-gray-300 p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.provider === 'google' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.provider}
                        </span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
