
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBasket, LayoutDashboard, MessageSquare, ShoppingCart, User } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode, cartCount: number }> = ({ children, cartCount }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: ShoppingBasket, label: 'Store' },
    { path: '/assistant', icon: MessageSquare, label: 'AI Assistant' },
    { path: '/admin', icon: LayoutDashboard, label: 'Admin' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-green-600 flex items-center gap-2">
          <ShoppingBasket className="w-6 h-6" />
          KiranaConnect
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Sidebar (Desktop) / Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 md:relative md:w-64 bg-white border-t md:border-t-0 md:border-r z-50 md:flex md:flex-col">
        <div className="hidden md:flex p-6 border-b">
          <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
            <ShoppingBasket className="w-8 h-8" />
            Kirana
          </h1>
        </div>
        
        <div className="flex md:flex-col justify-around md:justify-start md:p-4 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-3 md:p-4 rounded-xl transition-colors ${
                  isActive 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-500 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          <Link
            to="/cart"
            className="md:hidden flex flex-col items-center gap-1 p-3 text-gray-500 relative"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">Cart</span>
          </Link>
        </div>

        <div className="hidden md:mt-auto md:p-4 md:border-t md:block">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold">Store Manager</p>
              <p className="text-xs text-gray-500">Premium Owner</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0 h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
