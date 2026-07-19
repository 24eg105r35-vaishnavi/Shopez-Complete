import apiClient from './apiClient';

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role?: string }) =>
    apiClient.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
  getProfile: () =>
    apiClient.get('/auth/profile'),
  updateProfile: (data: any) =>
    apiClient.put('/auth/profile', data),
};

// Products API
export const productsAPI = {
  getAll: (params?: any) =>
    apiClient.get('/products', { params }),
  getById: (id: string) =>
    apiClient.get(`/products/${id}`),
  getByCategory: (category: string) =>
    apiClient.get(`/products/category/${category}`),
  create: (data: any) =>
    apiClient.post('/products', data),
  update: (id: string, data: any) =>
    apiClient.put(`/products/${id}`, data),
  delete: (id: string) =>
    apiClient.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: () =>
    apiClient.get('/cart'),
  addToCart: (data: { productId: string; quantity: number }) =>
    apiClient.post('/cart/add', data),
  updateCart: (data: { productId: string; quantity: number }) =>
    apiClient.put('/cart/update', data),
  removeFromCart: (productId: string) =>
    apiClient.delete(`/cart/remove/${productId}`),
  clearCart: () =>
    apiClient.delete('/cart/clear'),
};

// Orders API
export const ordersAPI = {
  create: (data: any) =>
    apiClient.post('/orders', data),
  getAll: () =>
    apiClient.get('/orders'),
  getById: (id: string) =>
    apiClient.get(`/orders/${id}`),
  updateStatus: (id: string, status: string) =>
    apiClient.put(`/orders/${id}/status`, { status }),
  cancel: (id: string) =>
    apiClient.put(`/orders/${id}/cancel`),
};
