"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full  shadow-md fixed top-0 left-0 z-50
      px-6 py-4 
                   bg-gray-900/40 backdrop-blur-md border-b border-gray-900/30 
                     ">
      {/* Tầng 1 */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" width={60} height={60} alt="Logo" priority />
          <span className="text-white font-bold text-xl">Premium Shop</span>
        </Link>

        {/* Thanh tìm kiếm */}
        <div className="flex-1 mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập nội dung cần tìm..."
              className="w-full rounded-xl bg-gray-900/40 backdrop-blur-md border-b border-gray-900/30  text-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="absolute right-3 top-2.5 text-gray-400 hover:text-white">
              🔍
            </button>
          </div>
        </div>

        {/* Đăng nhập + Giỏ hàng */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-gray-900/40 backdrop-blur-md border-b border-gray-900/30  hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
          >
            <User size={18} />
            Đăng nhập
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 bg-gray-900/40 backdrop-blur-md border-b border-gray-900/30  hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
          >
            <ShoppingCart size={18} />
            Giỏ hàng
          </Link>
        </div>
      </div>

      {/* Tầng 2 - Danh mục */}
      <div className="flex justify-center items-center gap-6 px-6 py-3 border-t border-gray-700">
        {/* Nút Danh mục */}
        <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg transition">
          <Menu size={18} />
          Danh mục
        </button>

        {/* Danh sách thương hiệu */}
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <Link href="/netflix" className="flex items-center gap-2 hover:text-white">
            <Image src="/icons/netflix.png" width={20} height={20} alt="Netflix" />
            Netflix
          </Link>
          <Link href="/adobe" className="flex items-center gap-2 hover:text-white">
            <Image src="/icons/adobe.png" width={20} height={20} alt="Adobe" />
            Adobe
          </Link>
          <Link href="/google" className="flex items-center gap-2 hover:text-white">
            <Image src="/icons/google.png" width={20} height={20} alt="Google" />
            Google
          </Link>
          <Link href="/microsoft" className="flex items-center gap-2 hover:text-white">
            <Image src="/icons/microsoft.png" width={20} height={20} alt="Microsoft" />
            Microsoft
          </Link>
          <Link href="/spotify" className="flex items-center gap-2 hover:text-white">
            <Image src="/icons/spotify.png" width={20} height={20} alt="Spotify" />
            Spotify
          </Link>
          <Link href="/canva" className="flex items-center gap-2 hover:text-white">
            <Image src="/icons/canva.png" width={20} height={20} alt="Canva" />
            Canva
          </Link>
          <Link href="/games" className="flex items-center gap-2 hover:text-white">
            🎮 Games
          </Link>
        </div>
      </div>
    </header>
  );
}
