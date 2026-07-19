## 🚀 QUICK START GUIDE - ShopEZ

Follow these steps to get the complete ShopEZ e-commerce platform running in under 10 minutes!

### ⚡ 5-Minute Quick Start

#### Step 1: Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

#### Step 2: Start MongoDB (Choose One)

**Option A: Using Docker** (Easiest)
```bash
docker-compose up -d
# MongoDB running on localhost:27017
# Mongo Express UI: http://localhost:8081
```

**Option B: Local MongoDB**
```bash
# Make sure MongoDB is running
mongod
```

**Option C: MongoDB Atlas** (Cloud)
Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopez
```

#### Step 3: Create Environment Files

Frontend `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Backend `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/shopez
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

#### Step 4: Seed Database

```bash
cd backend
npm run seed
```

You'll see:
```
✓ Admin user created
✓ Created 8 sample products
✓ Database seeded successfully!

Test Credentials:
Email: admin@shopez.com
Password: Admin@123
```

#### Step 5: Start Both Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
# Open http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
# Running on http://localhost:5000
```

### ✅ You're Ready!

Visit http://localhost:5173 and:
1. Register a new account or login with demo credentials
2. Browse products
3. Add items to cart
4. Checkout
5. Track orders

### 🎯 Key Features to Try

- **Browse** - Search and filter products by category
- **Cart** - Add/remove items from shopping cart  
- **Auth** - Register and login
- **Checkout** - Complete purchase flow
- **Orders** - View order history and status
- **Profile** - Manage user information
- **Seller** - (Register as seller to access dashboard)

### 🔧 Useful Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code quality

# Backend
npm run dev          # Start dev server  
npm run seed         # Populate sample data
npm run build        # Build for production
npm start            # Run production build

# Docker
docker-compose up    # Start MongoDB
docker-compose down  # Stop MongoDB
```

### 📝 API Testing

Use Thunder Client or Postman to test API:

**Login:**
```
POST http://localhost:5000/api/auth/login
{
  "email": "admin@shopez.com",
  "password": "Admin@123"
}
```

**Get Products:**
```
GET http://localhost:5000/api/products
```

**Get Cart (requires token):**
```
GET http://localhost:5000/api/cart
Header: Authorization: Bearer {token}
```

### 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change `PORT` in `backend/.env` |
| MongoDB connection error | Ensure MongoDB is running, check URI |
| CORS errors | Verify `FRONTEND_URL` in backend `.env` |
| Module not found | Run `npm install` in respective folder |
| API returning 401 | Token expired, login again |

### 📚 Useful Files to Check

- **Frontend Routes:** `src/routes/` - All pages
- **API Functions:** `src/lib/api.ts` - API calls
- **Auth Context:** `src/lib/auth-context.tsx` - User state
- **Backend Models:** `backend/models/` - Database schemas
- **API Routes:** `backend/routes/` - Backend endpoints

### 🚀 Next Steps

1. **Customize** - Update colors, logos, content
2. **Add Features** - Payment gateway, email notifications
3. **Deploy** - Frontend to Vercel, Backend to Heroku
4. **Scale** - Add caching, optimization, monitoring

### 📖 Documentation

- Full Setup Guide: [SETUP.md](./SETUP.md)
- API Documentation: See SETUP.md API section
- Project Structure: See SETUP.md Project Structure section

### 💡 Tips

- Use demo account to explore features first
- Check browser console for debugging
- MongoDB Compass: Visual database tool
- Postman: Advanced API testing
- React DevTools: Browser extension for debugging

---

**Happy Coding! 🎉**

For more help, check SETUP.md or README.md
