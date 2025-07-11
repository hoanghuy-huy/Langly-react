import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '@/contexts/FavoriteContext';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { favorites } = useFavorites();

  const navList: string[] = [
    'Find a teacher',
    'Group class',
    'Community',
    'Become a teacher',
  ];

  const renderItemNav = () =>
    navList.map((item, index) => (
      <div
        key={index}
        className="text-hover-effect hover-effect flex h-16 cursor-pointer items-center justify-start px-4 py-2 hover:bg-gray-100 md:hover:bg-transparent"
      >
        {item}
      </div>
    ));

  return (
    <>
      <div className="flex h-[var(--hight-header)] flex-col justify-center border border-gray-200 px-3">
        <div className="flex items-center justify-between gap-x-5 p-2 text-sm font-medium text-gray-600 capitalize">
          <div className="font-bold text-[var(--primary-color)]">
            <Link to={'/'}>Logo</Link>
          </div>

          <div className="hidden flex-1 items-center justify-end gap-x-3 md:flex">
            {renderItemNav()}
          </div>

          <div className="flex items-center gap-x-4">
            <button
              className="block p-2 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden items-center gap-x-4 md:flex">
              <Link
                to="/favorite"
                className="relative text-hover-effect hover-effect cursor-pointer p-2"
              >
                <Heart size={20} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {favorites.length}
                  </span>
                )}
              </Link>
              <div className="text-hover-effect hover-effect cursor-pointer">
                Login
              </div>
              <div className="text-hover-effect hover-effect cursor-pointer">
                Sign in
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-end p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 cursor-pointer text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col py-4">{renderItemNav()}</div>

          <div className="flex flex-col py-4">
            <div className="text-hover-effect hover-effect flex h-16 cursor-pointer items-center justify-start px-4 py-2 hover:bg-gray-100">
              Login{' '}
            </div>
            <div className="text-hover-effect hover-effect flex h-16 cursor-pointer items-center justify-start px-4 py-2 hover:bg-gray-100">
              Sign In{' '}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
