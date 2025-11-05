
import React from 'react';
import { SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon } from './icons';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
             <button className="md:hidden p-2 text-gray-600">
                <MenuIcon className="h-6 w-6" />
            </button>
            <a href="#" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">Mercado</span>
              <span className="text-2xl font-bold text-gray-700">Plaza</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 text-gray-600 hover:text-primary">
              <UserIcon className="h-6 w-6" />
            </a>
            <button onClick={onCartClick} className="relative p-2 text-gray-600 hover:text-primary">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Search Bar */}
        <div className="md:hidden py-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;