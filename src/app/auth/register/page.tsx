'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Đăng ký thành công! Đang chuyển hướng...');
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      } else {
        setError(data.message || 'Có lỗi xảy ra khi đăng ký');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated SVG Background */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1440 560"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4facfe">
                <animate attributeName="stop-color" values="#4facfe;#00f2fe;#a8e6cf;#88d8a3;#6bb6ff;#4facfe" dur="12s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#00f2fe">
                <animate attributeName="stop-color" values="#00f2fe;#a8e6cf;#88d8a3;#6bb6ff;#4facfe;#00f2fe" dur="12s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a8e6cf">
                <animate attributeName="stop-color" values="#a8e6cf;#88d8a3;#6bb6ff;#4facfe;#00f2fe;#a8e6cf" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#88d8a3">
                <animate attributeName="stop-color" values="#88d8a3;#6bb6ff;#4facfe;#00f2fe;#a8e6cf;#88d8a3" dur="10s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Animated Circles */}
          <circle cx="300" cy="200" r="90" fill="url(#gradient1)" opacity="0.6" filter="url(#glow)">
            <animate attributeName="r" values="90;130;90" dur="8s" repeatCount="indefinite" />
            <animate attributeName="cx" values="300;400;300" dur="10s" repeatCount="indefinite" />
            <animate attributeName="cy" values="200;120;200" dur="12s" repeatCount="indefinite" />
          </circle>

          <circle cx="900" cy="350" r="110" fill="url(#gradient2)" opacity="0.5" filter="url(#glow)">
            <animate attributeName="r" values="110;70;110" dur="9s" repeatCount="indefinite" />
            <animate attributeName="cx" values="900;1000;900" dur="11s" repeatCount="indefinite" />
            <animate attributeName="cy" values="350;250;350" dur="13s" repeatCount="indefinite" />
          </circle>

          <circle cx="1300" cy="150" r="70" fill="url(#gradient1)" opacity="0.4" filter="url(#glow)">
            <animate attributeName="r" values="70;100;70" dur="6s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1300;1200;1300" dur="8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="150;250;150" dur="10s" repeatCount="indefinite" />
          </circle>

          {/* Floating Shapes */}
          <polygon points="150,450 200,400 250,450 200,500" fill="url(#gradient2)" opacity="0.3" filter="url(#glow)">
            <animateTransform attributeName="transform" type="rotate" values="0 200 450;360 200 450" dur="25s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite" />
          </polygon>

          <polygon points="1150,500 1200,450 1250,500 1200,550" fill="url(#gradient1)" opacity="0.4" filter="url(#glow)">
            <animateTransform attributeName="transform" type="rotate" values="360 1200 500;0 1200 500" dur="18s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
          </polygon>

          {/* Particles */}
          <g opacity="0.5">
            {[...Array(20)].map((_, i) => (
              <circle key={i} cx={80 + i * 70} cy={30 + (i % 4) * 130} r="3" fill="#ffffff">
                <animate attributeName="cy" values={`${30 + (i % 4) * 130};${480 + (i % 4) * 40};${30 + (i % 4) * 130}`} dur={`${6 + i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur={`${4 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        </svg>
      </div>

      {/* Register Form */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-green-600 bg-clip-text text-transparent">
              Đăng Ký
            </h1>
            <p className="text-gray-600 mt-2">Tạo tài khoản mới để bắt đầu mua sắm cùng chúng tôi.</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6 animate-pulse">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6 animate-shake">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="Nhập họ và tên"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="Nhập email của bạn"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="Nhập mật khẩu"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="Nhập lại mật khẩu"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                Tôi đồng ý với{' '}
                <Link href="/terms" className="text-green-600 hover:text-green-500 font-medium">
                  điều khoản dịch vụ
                </Link>
                {' '}và{' '}
                <Link href="/privacy" className="text-green-600 hover:text-green-500 font-medium">
                  chính sách bảo mật
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang đăng ký...
                </div>
              ) : (
                'Đăng ký'
              )}
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link href="/auth/signin" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
