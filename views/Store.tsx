
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Search, Plus, Minus, ShoppingCart, Filter } from 'lucide-react';

interface StoreProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  cartItems: any[];
}

export const Store: React.FC<StoreProps> = ({ products, onAddToCart, cartItems }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getQuantityInCart = (id: string) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Neighborhood Store</h1>
          <p className="text-gray-500">Fresh groceries delivered to your doorstep.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for rice, milk, vegetables..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 gap-3 scrollbar-hide no-scrollbar">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-6 py-2 rounded-full border whitespace-nowrap transition-all ${
            selectedCategory === 'All' 
              ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
          }`}
        >
          All Items
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full border whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const qty = getQuantityInCart(product.id);
          return (
            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-green-700 shadow-sm">
                  {product.category}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800 text-lg leading-tight">{product.name}</h3>
                <p className="text-xs text-gray-500 truncate">{product.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                    <span className="text-xs text-gray-400">per {product.unit}</span>
                  </div>
                  
                  {qty > 0 ? (
                    <div className="flex items-center gap-3 bg-green-50 px-2 py-1 rounded-lg">
                      <button 
                        onClick={() => onAddToCart({ ...product, price: -1 } as any)} // Hack for demo decrease
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-green-700">{qty}</span>
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400">No products found</h3>
        </div>
      )}
    </div>
  );
};
