import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product.js';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const { category, search, sort, page = 1, limit = 10 } = req.query;

  // Build filter
  const filter: any = {};
  if (category && category !== 'all') {
    filter.category = category;
  }
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // Calculate pagination
  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;
  const skip = (pageNum - 1) * limitNum;

  // Get products
  const products = await Product.find(filter)
    .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : { createdAt: -1 })
    .skip(skip)
    .limit(limitNum)
    .populate('seller', 'name');

  // Get total count
  const total = await Product.countDocuments(filter);

  res.json({
    success: true,
    products,
    pagination: {
      total,
      pages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      limit: limitNum,
    },
  });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate('seller', 'name email');

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({
    success: true,
    product,
  });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, originalPrice, category, image, stock } = req.body;

  if (!name || !description || !price || !category || !image) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const product = await Product.create({
    name,
    description,
    price,
    originalPrice,
    category,
    image,
    stock: stock || 0,
    seller: req.userId,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, originalPrice, category, image, stock } = req.body;

  let product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (product.seller.toString() !== req.userId && req.userId !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to update this product' });
  }

  product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      originalPrice,
      category,
      image,
      stock,
    },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    product,
  });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (product.seller.toString() !== req.userId && req.userId !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this product' });
  }

  await Product.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
});

export const getProductsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = req.params;

  const products = await Product.find({ category })
    .sort({ createdAt: -1 })
    .populate('seller', 'name');

  res.json({
    success: true,
    products,
  });
});
