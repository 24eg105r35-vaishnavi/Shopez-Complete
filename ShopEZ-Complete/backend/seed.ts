import 'dotenv/config';
import connectDB from './config/database.js';
import User from './models/User.js';
import Product from './models/Product.js';

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin/seller user
    const seller = await User.create({
      name: 'ShopEZ Admin',
      email: 'admin@shopez.com',
      password: 'Admin@123',
      role: 'admin',
    });

    console.log('✓ Admin user created');

    // Create sample products
    const products = [
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Immersive sound with 30 hours of battery life and adaptive noise cancellation.',
        price: 149.99,
        originalPrice: 229.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800',
        rating: 4.7,
        reviews: 1284,
        stock: 50,
        seller: seller._id,
      },
      {
        name: 'Smart Fitness Watch Series 6',
        description: 'Track workouts, heart rate, sleep and notifications on a bright AMOLED display.',
        price: 199.0,
        originalPrice: 249.0,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
        rating: 4.5,
        reviews: 842,
        stock: 30,
        seller: seller._id,
      },
      {
        name: 'Minimalist Leather Backpack',
        description: 'Handcrafted full-grain leather backpack with padded 15" laptop sleeve.',
        price: 89.5,
        originalPrice: 120.0,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        rating: 4.6,
        reviews: 412,
        stock: 40,
        seller: seller._id,
      },
      {
        name: 'Premium Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe and built-in grinder.',
        price: 129.99,
        originalPrice: 179.99,
        category: 'Home & Kitchen',
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=800',
        rating: 4.4,
        reviews: 567,
        stock: 25,
        seller: seller._id,
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Double-wall insulated bottle keeps drinks hot for 12 hours or cold for 24 hours.',
        price: 34.99,
        originalPrice: 49.99,
        category: 'Sports & Outdoors',
        image: 'https://images.unsplash.com/photo-1602527336146-fcd180e50914?w=800',
        rating: 4.8,
        reviews: 2341,
        stock: 100,
        seller: seller._id,
      },
      {
        name: 'Organic Cotton T-Shirt',
        description: '100% organic cotton, soft and breathable, perfect for everyday wear.',
        price: 29.99,
        originalPrice: 39.99,
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        rating: 4.5,
        reviews: 892,
        stock: 75,
        seller: seller._id,
      },
      {
        name: '4K Webcam',
        description: 'Ultra HD 4K resolution with auto-focus and built-in microphone.',
        price: 159.99,
        originalPrice: 199.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
        rating: 4.6,
        reviews: 445,
        stock: 20,
        seller: seller._id,
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip eco-friendly yoga mat with carrying strap.',
        price: 45.0,
        originalPrice: 65.0,
        category: 'Sports & Outdoors',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
        rating: 4.7,
        reviews: 1123,
        stock: 60,
        seller: seller._id,
      },
    ];

    await Product.insertMany(products);
    console.log(`✓ Created ${products.length} sample products`);

    console.log('\n✓ Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('Email: admin@shopez.com');
    console.log('Password: Admin@123\n');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
