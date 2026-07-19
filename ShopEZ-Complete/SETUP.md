# ShopEZ - Complete E-Commerce Platform

Your one-stop destination for effortless online shopping with a robust backend API and modern frontend.

## 🚀 Project Structure

```
shopez-project/
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── routes/       # TanStack Router pages
│   │   ├── components/   # Reusable components
│   │   ├── lib/          # Utilities and APIs
│   │   └── styles/       # Global styles
│   ├── package.json
│   └── vite.config.ts
└── backend/              # Express + MongoDB backend
    ├── server.ts         # Main server file
    ├── models/           # Mongoose schemas
    ├── routes/           # API routes
    ├── controllers/       # Business logic
    ├── middleware/        # Custom middleware
    └── package.json
```

## 📋 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Router** - Routing
- **TanStack Query** - Data fetching
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🛠️ Prerequisites

- Node.js 18+ and npm
- MongoDB installed locally or a MongoDB Atlas account
- Git

## 📦 Installation & Setup

### 1. **Clone/Extract Project**

```bash
cd shopez-project
```

### 2. **Frontend Setup**

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# The .env should contain:
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### 3. **Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB connection string:
# MONGODB_URI=mongodb://localhost:27017/shopez
# PORT=5000
# JWT_SECRET=your_super_secret_key
# FRONTEND_URL=http://localhost:5173

# Seed database with sample data
npm run seed
# Output: Test user - admin@shopez.com / Admin@123

# Start backend server
npm run dev
# Backend runs on http://localhost:5000
```

### 4. **MongoDB Setup** (if using local MongoDB)

```bash
# On Windows, MongoDB should be running as a service
# Or manually start MongoDB:
mongod

# Verify connection
mongo
# Should connect to mongodb://localhost:27017
```

## 🚀 Running the Project

### Option 1: Run Separately (in different terminals)

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend && npm run dev
```

### Option 2: Run Both Together

```bash
# From root directory (requires concurrently)
npm install -g concurrently  # if not already installed
npm run dev:all
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

**Register**
```
POST /auth/register
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "role": "customer" or "seller"
}
```

**Login**
```
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
Response: { token: "jwt_token", user: {...} }
```

**Get Profile** (requires auth)
```
GET /auth/profile
Header: Authorization: Bearer {token}
```

### Products Endpoints

**Get All Products**
```
GET /products?category=Electronics&search=headphones&sort=asc&page=1&limit=10
```

**Get Product by ID**
```
GET /products/:id
```

**Get Products by Category**
```
GET /products/category/Electronics
```

**Create Product** (requires auth, seller only)
```
POST /products
{
  "name": "Product Name",
  "description": "Description",
  "price": 99.99,
  "originalPrice": 129.99,
  "category": "Electronics",
  "image": "image_url",
  "stock": 50
}
```

### Cart Endpoints (requires auth)

**Get Cart**
```
GET /cart
```

**Add to Cart**
```
POST /cart/add
{
  "productId": "product_id",
  "quantity": 1
}
```

**Update Cart Item**
```
PUT /cart/update
{
  "productId": "product_id",
  "quantity": 2
}
```

**Remove from Cart**
```
DELETE /cart/remove/:productId
```

**Clear Cart**
```
DELETE /cart/clear
```

### Orders Endpoints (requires auth)

**Create Order**
```
POST /orders
{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "country": "Country"
  },
  "paymentMethod": "credit_card"
}
```

**Get All Orders**
```
GET /orders
```

**Get Order by ID**
```
GET /orders/:id
```

**Update Order Status** (requires auth)
```
PUT /orders/:id/status
{
  "status": "pending|confirmed|processing|shipped|delivered|cancelled"
}
```

## 🔐 Authentication

### JWT Token
- Tokens are stored in localStorage as `token`
- User info stored as `user`
- Tokens auto-attach to all API requests via axios interceptor
- Automatically removed on logout or token expiration (401 response)

### Demo Credentials
```
Email: admin@shopez.com
Password: Admin@123
Role: admin
```

## 📁 Project Features

### Frontend Features
✅ Product browsing and search
✅ Shopping cart management
✅ User authentication (login/register)
✅ Order checkout process
✅ User profile management
✅ Seller dashboard (admin panel)
✅ Responsive design with Tailwind
✅ Real-time cart updates
✅ Order tracking

### Backend Features
✅ RESTful API with Express
✅ MongoDB data persistence
✅ JWT authentication
✅ Password hashing (bcryptjs)
✅ Product inventory management
✅ Order management system
✅ Cart management
✅ User role system (customer/seller/admin)
✅ Error handling middleware
✅ CORS enabled

## 🗂️ Key Files

### Frontend
- `src/lib/auth-context.tsx` - Authentication state management
- `src/lib/api.ts` - API service functions
- `src/lib/apiClient.ts` - Axios instance configuration
- `src/routes/login.tsx` - Login page
- `src/routes/register.tsx` - Registration page
- `src/components/SiteHeader.tsx` - Navigation header

### Backend
- `server.ts` - Express server setup
- `config/database.ts` - MongoDB connection
- `models/` - Mongoose schemas (User, Product, Cart, Order)
- `controllers/` - Business logic
- `routes/` - API endpoints
- `middleware/auth.ts` - JWT authentication
- `seed.ts` - Database seeding script

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/shopez
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com (optional)
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running: `mongod`
- Check port 5000 is not in use
- Verify .env file is in `backend/` directory

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env` is correct
- Check CORS is enabled in backend (should be by default)

### Database connection error
- Verify MongoDB URI in `.env`
- For local MongoDB: `mongodb://localhost:27017/shopez`
- For Atlas: `mongodb+srv://user:password@cluster.mongodb.net/shopez`

### Port already in use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Production Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to Vercel, Netlify, etc.
```

### Backend
```bash
npm run build
npm start
# Deploy to Heroku, AWS, DigitalOcean, etc.
```

## 📝 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🤝 Contributing

Feel free to submit issues and pull requests to improve the project!

---

**ShopEZ Team** - Making online shopping effortless! 🛍️
