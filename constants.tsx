
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  'Vegetables',
  'Fruits',
  'Dairy',
  'Grains',
  'Snacks',
  'Beverages',
  'Household'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Basmati Rice',
    price: 120,
    unit: 'kg',
    category: 'Grains',
    stock: 50,
    image: 'https://picsum.photos/seed/rice/400/300',
    description: 'Long grain aromatic basmati rice.'
  },
  {
    id: '2',
    name: 'Organic Milk',
    price: 65,
    unit: 'L',
    category: 'Dairy',
    stock: 20,
    image: 'https://picsum.photos/seed/milk/400/300',
    description: 'Fresh farm milk, homogenized.'
  },
  {
    id: '3',
    name: 'Fresh Tomatoes',
    price: 40,
    unit: 'kg',
    category: 'Vegetables',
    stock: 15,
    image: 'https://picsum.photos/seed/tomato/400/300',
    description: 'Vine-ripened red tomatoes.'
  },
  {
    id: '4',
    name: 'Bananas',
    price: 60,
    unit: 'dozen',
    category: 'Fruits',
    stock: 12,
    image: 'https://picsum.photos/seed/banana/400/300',
    description: 'Sweet ripe bananas.'
  },
  {
    id: '5',
    name: 'Digestive Biscuits',
    price: 35,
    unit: 'pack',
    category: 'Snacks',
    stock: 100,
    image: 'https://picsum.photos/seed/biscuit/400/300',
    description: 'Healthy fiber-rich biscuits.'
  },
  {
    id: '6',
    name: 'Lentils (Masoor Dal)',
    price: 110,
    unit: 'kg',
    category: 'Grains',
    stock: 30,
    image: 'https://picsum.photos/seed/lentils/400/300',
    description: 'High protein red lentils.'
  },
  {
    id: '7',
    name: 'Detergent Powder',
    price: 250,
    unit: 'kg',
    category: 'Household',
    stock: 10,
    image: 'https://picsum.photos/seed/soap/400/300',
    description: 'Tough on stains, gentle on clothes.'
  }
];
