
import React from 'react';
import { CartItem, Product } from '../types';
import { Trash2, ShoppingBag, ChevronRight, IndianRupee, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartProps {
  items: CartItem[];
  onUpdateQty: (p: Product, delta: number) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQty, onClear, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/" 
          className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <button 
          onClick={onClear}
          className="text-red-500 text-sm font-medium hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
              <img src={item.image} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-400">Category: {item.category}</p>
                  </div>
                  <span className="font-bold text-green-600">₹{item.price * item.quantity}</span>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-xl">
                    <button 
                      onClick={() => onUpdateQty(item, -1)}
                      className="text-gray-400 hover:text-green-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQty(item, 1)}
                      className="text-green-600"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">₹{item.price} / {item.unit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-8">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Charges</span>
                <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>
                  {delivery === 0 ? 'FREE' : `₹${delivery}`}
                </span>
              </div>
              {delivery > 0 && (
                <p className="text-[10px] text-green-600 bg-green-50 p-2 rounded-lg">
                  Shop for ₹{501 - subtotal} more to get FREE delivery!
                </p>
              )}
              <div className="pt-4 border-t flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-green-600">₹{total}</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center justify-center gap-2 group"
            >
              Confirm Order <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-center text-[10px] text-gray-400 mt-4">
              Secure payments powered by neighborhood trust.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
