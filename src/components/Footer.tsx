import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Thông tin công ty */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Cửa hàng Premium</h3>
            <p className="text-gray-300 mb-4">
              Chuyên cung cấp tài khoản premium chất lượng cao với giá cả phải chăng. 
              Hỗ trợ 24/7 và bảo hành trong suốt quá trình sử dụng.
            </p>
            
            {/* Kênh YouTube */}
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-3">Kênh YouTube của chúng tôi</h4>
              <div className="space-y-2">
                <a
                  href="https://www.youtube.com/@CaBeoAudio8104"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  CaBeo Audio
                </a>
                <a
                  href="https://www.youtube.com/@CaBeoVietSub0801"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  CaBeo VietSub
                </a>
              </div>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.343-.09.378-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?service=Netflix" className="text-gray-300 hover:text-white transition-colors">
                  Netflix Premium
                </Link>
              </li>
              <li>
                <Link href="/products?service=YouTube" className="text-gray-300 hover:text-white transition-colors">
                  YouTube Premium
                </Link>
              </li>
              <li>
                <Link href="/products?service=Spotify" className="text-gray-300 hover:text-white transition-colors">
                  Spotify Premium
                </Link>
              </li>
              <li>
                <Link href="/products?service=Canva" className="text-gray-300 hover:text-white transition-colors">
                  Canva Pro
                </Link>
              </li>
              <li>
                <Link href="/products?service=ChatGPT" className="text-gray-300 hover:text-white transition-colors">
                  ChatGPT Plus
                </Link>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-gray-300 hover:text-white transition-colors">
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Thông tin liên hệ</h4>
              <div className="text-gray-300 space-y-1">
                <p>📧 Email: support@premiumshop.com</p>
                <p>📱 Hotline: 0123.456.789</p>
                <p>🕒 Hỗ trợ: 24/7</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Phương thức thanh toán</h4>
              <div className="flex space-x-2">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-blue-600 font-bold text-sm">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-red-600 font-bold text-sm">MASTER</span>
                </div>
                <div className="bg-blue-600 rounded px-2 py-1">
                  <span className="text-white font-bold text-sm">PayPal</span>
                </div>
                <div className="bg-green-600 rounded px-2 py-1">
                  <span className="text-white font-bold text-sm">MB Bank</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2025 Cửa hàng Premium. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
