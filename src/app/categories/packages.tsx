import React from 'react';

const data = [
  {
    category: 'Giải Trí + Xem Phim',
    products: [
      {
        name: 'Youtube Premium + Google One Drive + Gemini AI Pro',
        packages: [
          { duration: '1 tháng', price: 35000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '3 tháng', price: 75000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '6 tháng', price: 130000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '12 tháng', price: 180000, warranty: 'bảo hành trong quá trình sử dụng' },
        ],
      },
      {
        name: 'Netflix 4k Ultra',
        packages: [
          { duration: '1 tháng', price: 55000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '3 tháng', price: 150000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '6 tháng', price: 225000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '1 năm', price: 275000, warranty: 'bảo hành trong quá trình sử dụng' },
        ],
      },
      {
        name: 'VIEON',
        packages: [
          { duration: 'Gói VIEON VIP - 1 tháng', price: 50000, warranty: '' },
          { duration: 'Gói VIEON VIP - 2 tháng', price: 99000, warranty: '' },
          { duration: 'Gói VIEON VIP - 1 năm', price: 450000, warranty: '' },
        ],
      },
    ],
  },
  {
    category: 'Học Tập',
    products: [
      {
        name: 'Canva',
        packages: [
          { duration: '1 tháng', price: 20000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '1 năm', price: 70000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: 'LifeTime', price: 80000, warranty: 'bảo hành 1 năm' },
        ],
      },
      {
        name: 'Doulingo Super',
        packages: [
          { duration: '1 năm 1 slot', price: 150000, warranty: '' },
          { duration: '1 năm 5 slot', price: 630000, warranty: '' },
        ],
      },
    ],
  },
  {
    category: 'Làm Việc',
    products: [
      {
        name: 'ADOBE Full APP',
        packages: [
          { duration: '1 tháng 2 thiết bị', price: 140000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '3 tháng 2 thiết bị', price: 240000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '6 tháng 2 thiết bị', price: 400000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '1 năm 2 thiết bị', price: 550000, warranty: 'bảo hành trong quá trình sử dụng' },
        ],
      },
      {
        name: 'Google Drive AI Ultra 30TB VEO 3',
        packages: [
          { duration: 'Google AI Pro 2TB+ VEO3 1000 Credits Hạn 1 Tháng', price: 25000, warranty: '' },
          { duration: 'Combo 5 acc VEO 3 1000 Credits Hạn 1 Tháng', price: 85000, warranty: '' },
          { duration: 'Combo 10 acc VEO 3 1000 Credits Hạn 1 Tháng', price: 140000, warranty: '' },
          { duration: 'Combo 30 acc VEO 3 1000 Credits Hạn 1 Tháng', price: 350000, warranty: '' },
          { duration: 'Combo 50 acc VEO 3 1000 Credits Hạn 1 Tháng', price: 530000, warranty: '' },
        ],
      },
      {
        name: 'Capcut Pro',
        packages: [
          { duration: '1 tháng 3 thiết bị', price: 40000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '6 tháng 1 thiết bị', price: 130000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '1 năm 2 thiết bị', price: 200000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '1 năm 3 thiết bị', price: 250000, warranty: 'bảo hành trong quá trình sử dụng' },
        ],
      },
    ],
  },
  {
    category: 'AI',
    products: [
      {
        name: 'ChatGPT 4 Plus',
        packages: [
          { duration: '1 thiết bị - 1 tháng', price: 80000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '2 thiết bị - 1 tháng', price: 110000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '2 thiết bị - 3 tháng', price: 170000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '2 thiết bị - 6 tháng', price: 270000, warranty: 'bảo hành trong quá trình sử dụng' },
          { duration: '2 thiết bị - 12 tháng', price: 520000, warranty: 'bảo hành trong quá trình sử dụng' },
        ],
      },
      {
        name: 'Cursor Pro Plan - Dùng Riêng - Claude 4 Sonnet MaxMode',
        packages: [
          { duration: 'Vô hạn request 1 ngày - MaxMode(test)', price: 30000, warranty: '' },
          { duration: 'Vô hạn request 7 ngày - MaxMode', price: 110000, warranty: '' },
          { duration: 'Vô hạn request 30 ngày - MaxMode', price: 250000, warranty: '' },
          { duration: 'Vô hạn request 3 tháng - MaxMode', price: 530000, warranty: '' },
          { duration: 'Vô hạn request 1 năm - MaxMode', price: 1550000, warranty: '' },
        ],
      },
    ],
  },
];

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

export default function PackagesPage() {
  return (
    <div className="container mx-auto py-10 px-2 md:px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600 drop-shadow-lg">Bảng Giá Dịch Vụ Theo Danh Mục</h1>
      <div className="space-y-12">
        {data.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b pb-2 backdrop-blur-md bg-blue-100/40 rounded-lg px-2 inline-block shadow">{cat.category}</h2>
            <div className="space-y-8">
              {cat.products.map((prod) => (
                <div key={prod.name} className="rounded-xl shadow-xl p-6 bg-white/60 backdrop-blur-lg border border-gray-200/40 transition hover:scale-[1.01] hover:shadow-2xl">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-400 mr-2"></span>
                    {prod.name}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100/60">
                          <th className="py-2 px-4 text-left">Gói</th>
                          <th className="py-2 px-4 text-left">Giá</th>
                          <th className="py-2 px-4 text-left">Bảo hành</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prod.packages.map((pkg, idx) => (
                          <tr key={idx} className="border-b hover:bg-orange-50/40 transition">
                            <td className="py-2 px-4 font-medium text-gray-700 whitespace-nowrap">{pkg.duration}</td>
                            <td className="py-2 px-4 text-orange-600 font-bold whitespace-nowrap">{formatPrice(pkg.price)}</td>
                            <td className="py-2 px-4 text-green-600 whitespace-nowrap">{pkg.warranty || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
