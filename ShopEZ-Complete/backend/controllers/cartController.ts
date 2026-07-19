import { Request, Response } from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  let cart = await Cart.findOne({ user: req.userId }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: req.userId, items: [] });
  }

  res.json({
    success: true,
    cart,
  });
});

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid product or quantity' });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }

  let cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    cart = await Cart.create({
      user: req.userId,
      items: [
        {
          product: productId,
          quantity,
          price: product.price,
        },
      ],
    });
  } else {
    // Check if product already in cart
    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();
  }

  await cart.populate('items.product');

  res.json({
    success: true,
    cart,
  });
});

export const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity < 0) {
    return res.status(400).json({ message: 'Invalid product or quantity' });
  }

  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const cartItem = cart.items.find((item) => item.product.toString() === productId);

  if (!cartItem) {
    return res.status(404).json({ message: 'Product not in cart' });
  }

  if (quantity === 0) {
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  } else {
    const product = await Product.findById(productId);
    if (product && product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    cartItem.quantity = quantity;
  }

  await cart.save();
  await cart.populate('items.product');

  res.json({
    success: true,
    cart,
  });
});

export const removeFromCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== productId);
  await cart.save();
  await cart.populate('items.product');

  res.json({
    success: true,
    cart,
  });
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ user: req.userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = [];
  await cart.save();

  res.json({
    success: true,
    cart,
  });
});
