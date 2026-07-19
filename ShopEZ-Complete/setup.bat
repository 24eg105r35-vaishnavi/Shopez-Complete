@echo off
REM ShopEZ - Quick Setup Script for Windows

echo.
echo 🚀 ShopEZ Project Setup
echo =======================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm version: %NPM_VERSION%

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
call npm install
if exist .env.example (
    copy .env.example .env
)
echo ✓ Frontend dependencies installed

REM Setup Backend
echo.
echo 📦 Setting up Backend...
cd backend
call npm install
if exist .env.example (
    copy .env.example .env
)
echo ✓ Backend dependencies installed

REM Check MongoDB
echo.
echo 🗄️  Checking MongoDB...
where mongod >nul 2>nul
if %errorlevel% equ 0 (
    echo ✓ MongoDB is installed
) else (
    echo ℹ️  MongoDB not found locally
)

echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start the project:
echo    1. Start MongoDB (if using local)
echo    2. npm run dev              (Frontend)
echo    3. cd backend ^&^& npm run dev (Backend in another terminal)
echo.
echo 📖 For detailed setup instructions, see SETUP.md
echo.
pause
