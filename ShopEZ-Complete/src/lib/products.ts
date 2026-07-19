export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 149.99,
    originalPrice: 229.99,
    category: "Electronics",
    rating: 4.7,
    reviews: 1284,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800",
    description: "Immersive sound with 30 hours of battery life and adaptive noise cancellation.",
  },
  {
    id: "p2",
    name: "Smart Fitness Watch Series 6",
    price: 199.0,
    originalPrice: 249.0,
    category: "Electronics",
    rating: 4.5,
    reviews: 842,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    description: "Track workouts, heart rate, sleep and notifications on a bright AMOLED display.",
  },
  {
    id: "p3",
    name: "Minimalist Leather Backpack",
    price: 89.5,
    category: "Fashion",
    rating: 4.6,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    description: "Handcrafted full-grain leather backpack with padded 15\" laptop sleeve.",
  },
  {
    id: "p4",
    name: "Ceramic Pour-Over Coffee Set",
    price: 45.0,
    originalPrice: 60.0,
    category: "Home",
    rating: 4.8,
    reviews: 305,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    description: "Everything you need to brew barista-quality coffee at home.",
  },
  {
    id: "p5",
    name: "Ultra-Slim Laptop Stand",
    price: 34.99,
    category: "Electronics",
    rating: 4.4,
    reviews: 927,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    description: "Aluminum ergonomic stand fits all 11-17\" laptops. Foldable & portable.",
  },
  {
    id: "p6",
    name: "Organic Cotton T-Shirt",
    price: 24.0,
    category: "Fashion",
    rating: 4.3,
    reviews: 1560,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    description: "Soft, breathable, and sustainably made. Available in six colors.",
  },
  {
    id: "p7",
    name: "Bluetooth Portable Speaker",
    price: 59.99,
    originalPrice: 79.99,
    category: "Electronics",
    rating: 4.5,
    reviews: 673,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    description: "Waterproof, dustproof, 20-hour battery — take your music anywhere.",
  },
  {
    id: "p8",
    name: "Scented Soy Candle — Vanilla Oak",
    price: 18.5,
    category: "Home",
    rating: 4.9,
    reviews: 221,
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=800",
    description: "Hand-poured soy wax candle with 45-hour burn time.",
  },
  {
    id: "p9",
    name: "Running Shoes — Cloud Runner",
    price: 119.0,
    originalPrice: 140.0,
    category: "Fashion",
    rating: 4.6,
    reviews: 1092,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    description: "Lightweight cushioning and breathable knit upper for daily runs.",
  },
  {
    id: "p10",
    name: "Mechanical Keyboard RGB",
    price: 99.0,
    category: "Electronics",
    rating: 4.7,
    reviews: 588,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    description: "Hot-swappable switches, per-key RGB, and premium PBT keycaps.",
  },
  {
    id: "p11",
    name: "Yoga Mat Pro — 6mm",
    price: 39.99,
    category: "Home",
    rating: 4.5,
    reviews: 404,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800",
    description: "Non-slip, eco-friendly TPE mat with alignment lines.",
  },
  {
    id: "p12",
    name: "Sunglasses — Classic Aviator",
    price: 54.0,
    originalPrice: 79.0,
    category: "Fashion",
    rating: 4.4,
    reviews: 719,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    description: "UV400 protection with polarized lenses and lightweight metal frame.",
  },
];

export const CATEGORIES = ["All", "Electronics", "Fashion", "Home"] as const;

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
