import { useState } from 'react';
import { Menu, X, Heart, Users, BookOpen, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '@/contexts/FavoriteContext';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { favorites } = useFavorites();
  const location = useLocation();

  const navList = [
    { label: 'Trang chủ', icon: <Home size={18} />, to: '/' },
    { label: 'Khóa học', icon: <BookOpen size={18} />, to: '/#' },
    { label: 'Yêu thích', icon: <Heart size={18} />, to: '/favorite', badge: favorites.length },
    { label: 'Cộng đồng', icon: <Users size={18} />, to: '/#' },
  ];

  const renderItemNav = (isMobile = false) =>
    navList.map((item, index) => (
      <Link
        key={index}
        to={item.to}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors font-medium text-gray-700 hover:bg-gray-100 ${location.pathname === item.to ? 'bg-gray-100 text-[var(--primary-color)]' : ''} ${isMobile ? 'text-base' : 'h-12'}`}
        onClick={() => setSidebarOpen(false)}
        style={{ position: 'relative' }}
      >
        <span className="relative">
          {item.icon}
          {item.label === 'Yêu thích' && typeof item.badge !== 'undefined' && item.badge > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow">{item.badge}</span>
          )}
        </span>
        <span>{item.label}</span>
      </Link>
    ));

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 md:px-10">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-[var(--primary-color)]">
            <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
            <span>CodeBase</span>
          </Link>

          <nav className="hidden md:flex items-center gap-x-2 flex-1 justify-center">
            {renderItemNav()}
          </nav>

          <div className="hidden md:flex items-center gap-x-4">
            <Link to="/#" className="px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 transition-colors">Đăng nhập</Link>
            <Link to="/register" className="px-4 py-2 rounded-md font-medium text-white bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 transition-colors">Đăng ký</Link>
          </div>

          <button
            className="block md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
            aria-label="Mở menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Sidebar mobile */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${sidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />

        <aside
          className={`absolute top-0 right-0 h-full w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-[var(--primary-color)]" onClick={() => setSidebarOpen(false)}>
              <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
              <span>CodeBase</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} aria-label="Đóng menu">
              <X className="h-6 w-6 cursor-pointer text-gray-600" />
            </button>
          </div>

          <nav className="flex flex-col py-4 gap-1">
            {renderItemNav(true)}
          </nav>

          <div className="flex flex-col gap-2 px-4 pb-4">
            <Link to="/login" className="px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 transition-colors">Đăng nhập</Link>
            <Link to="/register" className="px-4 py-2 rounded-md font-medium text-white bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 transition-colors">Đăng ký</Link>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Header;
