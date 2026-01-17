
export type Category = 'Vegetables' | 'Fruits' | 'Dairy' | 'Grains' | 'Snacks' | 'Beverages' | 'Household';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: Category;
  stock: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  customerName: string;
}

export interface InventoryStats {
  totalProducts: number;
  lowStockItems: number;
  totalValue: number;
}
