import { Request, Response } from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const generateOrderNumber = () => {
  return 'ORD-' + Date.now() + Math.floor(Math.random() * 1000);
};

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { shippingAddress, paymentMethod } = req.body;

  if (!shippingAddress || !paymentMethod) {
    return res.status(400).json({ message: 'Please provide shipping address and payment method' });
  }

  const cart = await Cart.findOne({ user: req.userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // Calculate total and prepare order items
  let totalAmount = 0;
  const orderItems = [];

  for (const cartItem of cart.items) {
    const product = cartItem.product as any;

    if (product.stock < cartItem.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
    }

    const itemTotal = product.price * cartItem.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      product: product._id,
      quantity: cartItem.quantity,
      price: product.price,
    });

    // Reduce stock
    await Product.findByIdAndUpdate(product._id, {
      $inc: { stock: -cartItem.quantity },
    });
  }

  // Create order
  const order = await Order.create({
    orderNumber: generateOrderNumber(),
    user: req.userId,
    items: orderItems,
    totalAmount,
    shippingAddress,
    paymentMethod,
    paymentStatus: 'completed', // In real app, integrate with payment gateway
  });

  // Clear cart
  await Cart.findByIdAndUpdate(cart._id, { items: [] });

  res.status(201).json({
    success: true,
    order,
  });
});

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.userId })
    .populate('items.product')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    orders,
  });
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate('items.product').populate('user', 'name email');

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Check if user owns this order
  if (order.user._id.toString() !== req.userId && req.userId !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to view this order' });
  }

  res.json({
    success: true,
    order,
  });
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const order = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json({
    success: true,
    order,
  });
});

export const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.user.toString() !== req.userId && req.userId !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to cancel this order' });
  }

  if (['shipped', 'delivered'].includes(order.status)) {
    return res.status(400).json({ message: 'Cannot cancel this order' });
  }

  // Restore product stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity },
    });
  }

  order.status = 'cancelled';
  await order.save();

  res.json({
    success: true,
    order,
  });
});
