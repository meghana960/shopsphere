# ShopSphere – MERN E-Commerce Platform

A full-stack marketplace starter inspired by common large e-commerce workflows. It is an original demo project and is not affiliated with Amazon.

## Features
- Responsive React storefront with category browsing, search, sort, product details
- JWT registration/login, protected profile and order routes
- Cart and wishlist persisted in browser local storage
- Checkout with Cash on Delivery demo payment option
- Order creation and order history
- Admin-only product creation/deletion and order status management
- MongoDB models, REST API, seed data and demo admin account

## Requirements
- Node.js 18+
- MongoDB local instance or MongoDB Atlas connection string

## Setup
1. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and `JWT_SECRET`.
2. From the project root run:
   ```bash
   npm install
   npm run install:all
   npm run seed
   npm run dev
   ```
3. Open http://localhost:5173

Backend runs at http://localhost:5000. API health check: http://localhost:5000/api/health

## Demo admin
Seed creates `admin@shopsphere.demo` with password `Admin123!`. Change this password and secret before any public deployment.

## Important
- Payments are intentionally demo-only (Cash on Delivery). Add a payment provider such as Razorpay or Stripe before accepting online payments.
- Product images use remote Unsplash URLs and require an internet connection. Replace them with your own licensed assets if desired.
- This is a learning/portfolio starter. Add production-grade validation, rate limiting, email verification, password reset, logging, tests and deployment configuration before real customer use.
