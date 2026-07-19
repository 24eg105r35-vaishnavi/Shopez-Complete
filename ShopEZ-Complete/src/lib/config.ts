// Environment configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const APP_NAME = 'ShopEZ';
export const APP_DESCRIPTION = 'Your one-stop destination for effortless online shopping.';

export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Books',
  'Toys & Games',
  'Beauty & Personal Care',
  'Grocery',
];

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

export const PAYMENT_METHODS = [
  'credit_card',
  'debit_card',
  'upi',
  'net_banking',
  'wallet',
  'cod',
];
