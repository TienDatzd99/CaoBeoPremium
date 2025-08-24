"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const { data: session, status } = useSession();
  const { state } = useCart();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="w-full shadow-2xl fixed top-0 left-0 z-50 group">
        {/* Background with gradient and blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/70 via-cyan-700/65 to-slate-600/70 backdrop-blur-xl"></div>
        
        {/* Animated border bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-50"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-2 left-10 w-1 h-1 bg-cyan-200/25 rounded-full animate-pulse"></div>
          <div className="absolute top-6 right-20 w-1.5 h-1.5 bg-slate-300/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-3 left-1/3 w-1 h-1 bg-cyan-300/20 rounded-full animate-ping"></div>
          <div className="absolute top-4 right-1/3 w-0.5 h-0.5 bg-slate-200/30 rounded-full animate-pulse"></div>
        </div>

      {/* Tầng 1 */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        {/* Logo với hiệu ứng */}
        <Link href="/" className="flex items-center gap-3 group/logo">
          <div className="relative">
            <Image 
              src="/logo.png" 
              width={60} 
              height={60} 
              alt="Logo" 
              priority 
              className="transition-transform duration-300 group-hover/logo:scale-110 group-hover/logo:rotate-3" 
            />
            {/* Logo glow effect */}
            <div className="absolute inset-0 bg-cyan-300/15 rounded-full blur-lg scale-150 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-white via-cyan-50 to-white bg-clip-text text-transparent group-hover/logo:from-cyan-100 group-hover/logo:via-white group-hover/logo:to-cyan-100 transition-all duration-300 drop-shadow-lg">
            Premium Shop
          </span>
        </Link>

        {/* Thanh tìm kiếm với hiệu ứng */}
        <div className="flex-1 mx-6">
          <div className="relative group/search">
            <input
              type="text"
              placeholder="Nhập nội dung cần tìm..."
              className="w-full rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-gray-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-300/40 focus:border-cyan-300/40 focus:bg-white/15 transition-all duration-300 placeholder-gray-300"
            />
            <button className="absolute right-3 top-3 text-gray-300 hover:text-cyan-200 transition-colors duration-300 hover:scale-110 transform">
              🔍
            </button>
            {/* Search glow effect */}
            <div className="absolute inset-0 bg-cyan-300/8 rounded-xl blur-lg opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>

        {/* Auth + Giỏ hàng với hiệu ứng */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="text-gray-300 animate-pulse">Loading...</div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white group/user">
                {session.user?.image && (
                  <div className="relative">
                    <Image
                      src={session.user.image}
                      width={32}
                      height={32}
                      alt="Avatar"
                      className="rounded-full transition-transform duration-300 group-hover/user:scale-110"
                    />
                    <div className="absolute inset-0 bg-cyan-300/15 rounded-full blur-md opacity-0 group-hover/user:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <span className="drop-shadow-sm">Xin chào, {session.user?.name || session.user?.email}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 bg-white/8 backdrop-blur-md border border-white/20 hover:bg-red-500/70 hover:border-red-400/40 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-2 bg-white/8 backdrop-blur-md border border-white/20 hover:bg-cyan-500/70 hover:border-cyan-400/40 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <User size={18} />
              Đăng nhập
            </Link>
          )}
          
          {/* Cart Button với hiệu ứng */}
          <button
            onClick={() => {
              const cartButton = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
              if (cartButton) cartButton.click();
            }}
            className="flex items-center gap-2 bg-white/8 backdrop-blur-md border border-white/20 hover:bg-cyan-500/70 hover:border-cyan-400/40 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 relative group/cart"
          >
            <ShoppingCart size={18} className="transition-transform duration-300 group-hover/cart:scale-110" />
            Giỏ hàng
            {state.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {state.itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tầng 2 - Danh mục với hiệu ứng */}
      <div className="relative z-10 flex justify-center items-center gap-6 px-6 py-3 border-t border-white/10">
        {/* Nút Danh mục với dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 relative overflow-hidden group/category"
          >
            <Menu size={18} className="transition-transform duration-300 group-hover/category:rotate-90" />
            Danh mục
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover/category:translate-x-[100%] transition-transform duration-700"></div>
          </button>

          {/* Dropdown Menu */}
          {isCategoryOpen && (
            <div className="fixed left-0 right-0 top-[140px] z-50">
              <div className="max-w-7xl mx-auto px-6">
                <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-600/30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-10">
                    <div className="grid grid-cols-3 gap-12">
                      
                      {/* Cột 1: Danh mục */}
                      <div>
                        <h2 className="text-white font-bold text-xl mb-6 border-b border-gray-400/40 pb-3">Danh mục</h2>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-white font-semibold text-base mb-3">🎬 Giải trí</h4>
                            <div className="space-y-2 ml-4">
                              <Link href="/category/streaming" className="block text-gray-200 hover:text-white font-medium transition-colors">Netflix, YouTube, Disney+</Link>
                              <Link href="/category/music" className="block text-gray-200 hover:text-white font-medium transition-colors">Spotify, Apple Music</Link>
                              <Link href="/category/gaming" className="block text-gray-200 hover:text-white font-medium transition-colors">Steam, Xbox Game Pass</Link>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-white font-semibold text-base mb-3">📚 Học tập</h4>
                            <div className="space-y-2 ml-4">
                              <Link href="/category/education" className="block text-gray-200 hover:text-white font-medium transition-colors">Coursera, Udemy</Link>
                              <Link href="/category/language" className="block text-gray-200 hover:text-white font-medium transition-colors">Duolingo, Babbel</Link>
                              <Link href="/category/ai-tools" className="block text-gray-200 hover:text-white font-medium transition-colors">ChatGPT, Claude</Link>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-white font-semibold text-base mb-3">💼 Làm việc</h4>
                            <div className="space-y-2 ml-4">
                              <Link href="/category/office" className="block text-gray-200 hover:text-white font-medium transition-colors">Microsoft 365, Google Workspace</Link>
                              <Link href="/category/design" className="block text-gray-200 hover:text-white font-medium transition-colors">Adobe, Canva Pro</Link>
                              <Link href="/category/productivity" className="block text-gray-200 hover:text-white font-medium transition-colors">Notion, Grammarly</Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cột 2: Thương hiệu */}
                      <div>
                        <h2 className="text-white font-bold text-xl mb-6 border-b border-gray-400/40 pb-3">Thương hiệu</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <Link href="/brand/netflix" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">N</span>
                            </div>
                            <span className="text-gray-200 font-medium">Netflix</span>
                          </Link>
                          
                          <Link href="/brand/adobe" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">Ai</span>
                            </div>
                            <span className="text-gray-200 font-medium">Adobe</span>
                          </Link>
                          
                          <Link href="/brand/google" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">G</span>
                            </div>
                            <span className="text-gray-200 font-medium">Google</span>
                          </Link>
                          
                          <Link href="/brand/microsoft" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="text-gray-200 font-medium">Microsoft</span>
                          </Link>
                          
                          <Link href="/brand/spotify" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">♫</span>
                            </div>
                            <span className="text-gray-200 font-medium">Spotify</span>
                          </Link>
                          
                          <Link href="/brand/canva" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">C</span>
                            </div>
                            <span className="text-gray-200 font-medium">Canva</span>
                          </Link>
                        </div>
                      </div>

                      {/* Cột 3: Tìm kiếm nhiều */}
                      <div>
                        <h2 className="text-white font-bold text-xl mb-6 border-b border-gray-400/40 pb-3">Tìm kiếm nhiều</h2>
                        <div className="space-y-3">
                          <Link href="/products/netflix-premium" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs">N</span>
                              </div>
                              <span className="text-gray-200 font-medium">Netflix Premium</span>
                            </div>
                            <span className="text-orange-400 text-sm font-semibold">Hot</span>
                          </Link>
                          
                          <Link href="/products/chatgpt-plus" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs">🤖</span>
                              </div>
                              <span className="text-gray-200 font-medium">ChatGPT Plus</span>
                            </div>
                            <span className="text-red-400 text-sm font-semibold">Trending</span>
                          </Link>
                          
                          <Link href="/products/canva-pro" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs">C</span>
                              </div>
                              <span className="text-gray-200 font-medium">Canva Pro</span>
                            </div>
                            <span className="text-blue-400 text-sm font-semibold">New</span>
                          </Link>
                          
                          <Link href="/products/spotify-premium" className="flex items-center p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs">♫</span>
                              </div>
                              <span className="text-gray-200 font-medium">Spotify Premium</span>
                            </div>
                          </Link>
                          
                          <Link href="/products/adobe-creative" className="flex items-center p-3 rounded-xl hover:bg-white/10 transition-all duration-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xs">Ai</span>
                              </div>
                              <span className="text-gray-200 font-medium">Adobe Creative</span>
                            </div>
                          </Link>
                          
                          <div className="border-t border-gray-400/40 mt-6 pt-4">
                            <Link 
                              href="/products" 
                              className="flex items-center justify-center gap-2 px-4 py-3 text-orange-400 hover:text-orange-300 rounded-lg transition-all duration-200 font-semibold hover:bg-orange-500/10"
                              onClick={() => setIsCategoryOpen(false)}
                            >
                              <span>Xem tất cả sản phẩm</span>
                              <span className="text-sm">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danh sách thương hiệu với hiệu ứng */}
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <Link href="/netflix" className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 group/brand">
            <Image src="/icons/netflix2.png" width={20} height={20} alt="Netflix" className="transition-transform duration-300 group-hover/brand:scale-110" />
            <span className="relative">
              Netflix
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover/brand:w-full transition-all duration-300"></div>
            </span>
          </Link>
          <Link href="/adobe" className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 group/brand">
            <Image src="/icons/adobe2.png" width={20} height={20} alt="Adobe" className="transition-transform duration-300 group-hover/brand:scale-110" />
            <span className="relative">
              Adobe
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover/brand:w-full transition-all duration-300"></div>
            </span>
          </Link>
          <Link href="/google" className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 group/brand">
            <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" height="20" viewBox="0 0 512 512" width="20"><g><path d="m120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308h-86.308c-34.255 44.488-52.823 98.707-52.823 155.785s18.568 111.297 52.823 155.785h86.308v-86.308c-12.142-20.347-19.131-44.11-19.131-69.477z" fill="#fbbd00"></path><path d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216c-20.525 12.186-44.388 19.039-69.569 19.039z" fill="#0f9d58"></path><path d="m139.131 325.477-86.308 86.308c6.782 8.808 14.167 17.243 22.158 25.235 48.352 48.351 112.639 74.98 181.019 74.98v-120c-49.624 0-93.117-26.72-116.869-66.523z" fill="#31aa52"></path><path d="m512 256c0-15.575-1.41-31.179-4.192-46.377l-2.251-12.299h-249.557v120h121.452c-11.794 23.461-29.928 42.602-51.884 55.638l86.216 86.216c8.808-6.782 17.243-14.167 25.235-22.158 48.352-48.353 74.981-112.64 74.981-181.02z" fill="#3c79e6"></path><path d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606c-48.352-48.352-112.639-74.981-181.02-74.981l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" fill="#cf2d48"></path><path d="m256 120v-120c-68.38 0-132.667 26.629-181.02 74.98-7.991 7.991-15.376 16.426-22.158 25.235l86.308 86.308c23.753-39.803 67.246-66.523 116.87-66.523z" fill="#eb4132"></path></g></svg>
            <span className="relative">
              Google
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover/brand:w-full transition-all duration-300"></div>
            </span>
          </Link>
          <Link href="/microsoft" className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 group/brand">
            <svg id="MS-symbol" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <rect className="cls-1" width="9.5" height="9.5"></rect>
              <rect className="cls-2" x="10.5" width="9.5" height="9.5"></rect>
              <rect className="cls-3" y="10.5" width="9.5" height="9.5"></rect>
              <rect className="cls-4" x="10.5" y="10.5" width="9.5" height="9.5"></rect>
              <style>
                {`.cls-1{fill:#f25022;}.cls-2{fill:#7fba00;}.cls-3{fill:#00a4ef;}.cls-4{fill:#ffb900;}`}
              </style>
            </svg>
            <span className="relative">
              Microsoft
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/brand:w-full transition-all duration-300"></div>
            </span>
          </Link>
          <Link href="/spotify" className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 group/brand">
            <Image src="/icons/spotify.svg" width={20} height={20} alt="Spotify" className="transition-transform duration-300 group-hover/brand:scale-110" />
            <span className="relative">
              Spotify
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover/brand:w-full transition-all duration-300"></div>
            </span>
          </Link>
          <Link href="/canva" className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 group/brand">
            <Image src="/icons/canva.png" width={20} height={20} alt="Canva" className="transition-transform duration-300 group-hover/brand:scale-110" />
            <span className="relative">
              Canva
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover/brand:w-full transition-all duration-300"></div>
            </span>
          </Link>
          <Link href="/games" className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 group/brand">
            <span className="text-lg transition-transform duration-300 group-hover/brand:scale-110">🎮</span>
            <span className="relative">
              Games
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover/brand:w-full transition-all duration-300"></div>
            </span>
          </Link>
        </div>
      </div>
      </header>

      {/* Backdrop Overlay - hiển thị khi dropdown mở */}
      {isCategoryOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={() => setIsCategoryOpen(false)}
        />
      )}
    </>
  );
}
