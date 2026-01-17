
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Store } from './views/Store';
import { Admin } from './views/Admin';
import { Assistant } from './views/Assistant';
import { Cart } from './views/Cart';
import { Product, CartItem, Order } from './types';
import { INITIAL_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Persist state in local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('kirana_cart');
    const savedOrders = localStorage.getItem('kirana_orders');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('kirana_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kirana_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // Handle negative price hack for removal
        if (product.price === -1) {
          if (existing.quantity === 1) return prev.filter(i => i.id !== product.id);
          return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i);
        }
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (product: Product, delta: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) return prev.filter(i => i.id !== product.id);
      return prev.map(i => i.id === product.id ? { ...i, quantity: newQty } : i);
    });
  };

  const handleCheckout = () => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cart],
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: new Date().toISOString(),
      status: 'Pending',
      customerName: 'Guest User'
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    alert("Order placed successfully!");
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Layout cartCount={cartCount}>
        <Routes>
          <Route path="/" element={
            <Store 
              products={products} 
              onAddToCart={addToCart} 
              cartItems={cart} 
            />
          } />
          <Route path="/admin" element={
            <Admin products={products} orders={orders} />
          } />
          <Route path="/assistant" element={
            <Assistant products={products} onAddToCart={addToCart} />
          } />
          <Route path="/cart" element={
            <Cart 
              items={cart} 
              onUpdateQty={handleUpdateQty} 
              onClear={() => setCart([])}
              onCheckout={handleCheckout}
            />
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
