'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Thông tin đăng nhập không chính xác');
      } else {
        // Kiểm tra session và chuyển hướng
        const session = await getSession();
        if (session) {
          router.push(callbackUrl);
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl });
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
              <stop offset="0%" stopColor="#667eea">
                <animate attributeName="stop-color" values="#667eea;#764ba2;#f093fb;#f5576c;#4facfe;#00f2fe;#667eea" dur="10s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#764ba2">
                <animate attributeName="stop-color" values="#764ba2;#f093fb;#f5576c;#4facfe;#00f2fe;#667eea;#764ba2" dur="10s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f093fb">
                <animate attributeName="stop-color" values="#f093fb;#f5576c;#4facfe;#00f2fe;#667eea;#764ba2;#f093fb" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#f5576c">
                <animate attributeName="stop-color" values="#f5576c;#4facfe;#00f2fe;#667eea;#764ba2;#f093fb;#f5576c" dur="8s" repeatCount="indefinite" />
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
          <circle cx="200" cy="150" r="80" fill="url(#gradient1)" opacity="0.7" filter="url(#glow)">
            <animate attributeName="r" values="80;120;80" dur="6s" repeatCount="indefinite" />
            <animate attributeName="cx" values="200;300;200" dur="8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="150;100;150" dur="10s" repeatCount="indefinite" />
          </circle>

          <circle cx="800" cy="300" r="100" fill="url(#gradient2)" opacity="0.6" filter="url(#glow)">
            <animate attributeName="r" values="100;60;100" dur="7s" repeatCount="indefinite" />
            <animate attributeName="cx" values="800;900;800" dur="9s" repeatCount="indefinite" />
            <animate attributeName="cy" values="300;200;300" dur="11s" repeatCount="indefinite" />
          </circle>

          <circle cx="1200" cy="100" r="60" fill="url(#gradient1)" opacity="0.5" filter="url(#glow)">
            <animate attributeName="r" values="60;90;60" dur="5s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1200;1100;1200" dur="7s" repeatCount="indefinite" />
            <animate attributeName="cy" values="100;200;100" dur="9s" repeatCount="indefinite" />
          </circle>

          {/* Floating Shapes */}
          <polygon points="100,400 150,350 200,400 150,450" fill="url(#gradient2)" opacity="0.4" filter="url(#glow)">
            <animateTransform attributeName="transform" type="rotate" values="0 150 400;360 150 400" dur="20s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
          </polygon>

          <polygon points="1100,450 1150,400 1200,450 1150,500" fill="url(#gradient1)" opacity="0.3" filter="url(#glow)">
            <animateTransform attributeName="transform" type="rotate" values="360 1150 450;0 1150 450" dur="15s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
          </polygon>

          {/* Wave Animation */}
          <path d="M0,320L48,341.3C96,363,192,405,288,426.7C384,448,480,448,576,421.3C672,395,768,341,864,330.7C960,320,1056,352,1152,357.3C1248,363,1344,341,1392,330.7L1440,320L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z" 
                fill="url(#gradient1)" opacity="0.2">
            <animate attributeName="d" 
              values="M0,320L48,341.3C96,363,192,405,288,426.7C384,448,480,448,576,421.3C672,395,768,341,864,330.7C960,320,1056,352,1152,357.3C1248,363,1344,341,1392,330.7L1440,320L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z;
                     M0,300L48,321.3C96,343,192,385,288,406.7C384,428,480,428,576,401.3C672,375,768,321,864,310.7C960,300,1056,332,1152,337.3C1248,343,1344,321,1392,310.7L1440,300L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z;
                     M0,320L48,341.3C96,363,192,405,288,426.7C384,448,480,448,576,421.3C672,395,768,341,864,330.7C960,320,1056,352,1152,357.3C1248,363,1344,341,1392,330.7L1440,320L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z" 
              dur="8s" repeatCount="indefinite" />
          </path>

          {/* Particles */}
          <g opacity="0.6">
            {[...Array(15)].map((_, i) => (
              <circle key={i} cx={100 + i * 100} cy={50 + (i % 3) * 150} r="2" fill="#ffffff">
                <animate attributeName="cy" values={`${50 + (i % 3) * 150};${450 + (i % 3) * 50};${50 + (i % 3) * 150}`} dur={`${5 + i}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        </svg>
      </div>

      {/* Sign In Form */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V14L7 18V20H17V18L13 14V11C14.1 11 15 10.1 15 9H21Z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
              Đăng Nhập
            </h1>
            <p className="text-gray-600 mt-2">Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn.</p>
          </div>

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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="Nhập mật khẩu"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang đăng nhập...
                </div>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => handleSocialSignIn('google')}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Đăng nhập với Google</span>
              </button>
            </div>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
