#!/bin/bash

# ShopEZ - Quick Setup Script

echo "🚀 ShopEZ Project Setup"
echo "======================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✓ npm version: $(npm --version)"

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
npm install
cp .env.example .env
echo "✓ Frontend dependencies installed"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
cp .env.example .env
echo "✓ Backend dependencies installed"

# Check MongoDB
echo ""
echo "🗄️  Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✓ MongoDB is installed"
    echo ""
    echo "💡 Tips:"
    echo "   - To start MongoDB locally: mongod"
    echo "   - Or use Docker: docker-compose up -d"
else
    echo "ℹ️  MongoDB not found locally"
    echo "💡 You can:"
    echo "   - Install MongoDB Community Edition"
    echo "   - Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    echo "   - Use Docker: docker-compose up -d"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the project:"
echo "   1. Start MongoDB (if using local)"
echo "   2. npm run dev              (Frontend)"
echo "   3. cd backend && npm run dev (Backend in another terminal)"
echo ""
echo "📖 For detailed setup instructions, see SETUP.md"
