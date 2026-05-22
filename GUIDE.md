# 📚 Project Structure Guide - E-commerce

## 🎯 Overview

This project is an e-commerce application built with **React** (frontend) and **Node.js/Express** (backend) using **MongoDB** as the database and **Tailwind CSS** for styling.

### 👥 Team Division

- **Carlos**: Backend (Node.js, Express, MongoDB, APIs)
- **Arturo**: Frontend (React, Tailwind CSS, UI/UX)

---

## 📁 Project Structure

```
project-root/
├── README.md                 # General project information
├── GUIDE.md                  # This file
├── .gitignore               # Files to ignore in Git
├── package.json             # Root dependencies (if applicable)
│
├── backend/                 # 🔧 CARLOS: All server and APIs
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables example
│   ├── config/
│   │   └── db.js           # MongoDB connection configuration
│   ├── models/             # MongoDB schemas
│   │   ├── User.js         # User model
│   │   ├── Product.js      # Product model
│   │   └── Cart.js         # Cart model
│   ├── routes/             # API endpoints/routes
│   │   ├── auth.js         # Login, signup, logout
│   │   ├── products.js     # Product CRUD
│   │   └── cart.js         # Cart operations
│   ├── controllers/        # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── cartController.js
│   └── middleware/         # Middleware functions
│       └── auth.js         # JWT token validation
│
└── frontend/               # 🎨 ARTURO: All UI and user interface
    ├── package.json       # Frontend dependencies
    ├── vite.config.js     # Vite configuration
    ├── tailwind.config.js # Tailwind configuration
    ├── .env.example       # Environment variables example
    ├── index.html         # Main HTML file
    ├── src/
    │   ├── main.jsx       # React entry point
    │   ├── App.jsx        # Root component
    │   ├── index.css      # Global styles with Tailwind
    │   ├── pages/         # Application pages
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── Checkout.jsx
    │   ├── components/    # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── CartItem.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── services/      # Functions to communicate with API
    │   │   └── api.js
    │   ├── context/       # Context API for global state
    │   │   └── AuthContext.jsx
    │   └── public/        # Static files
```

---

## 🔧 Backend (Carlos)

### Main Dependencies

- `express` - Web framework
- `mongoose` - ODM for MongoDB
- `bcryptjs` - Password encryption
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables
- `cors` - Allow requests from frontend

### Main Endpoints

#### Authentication

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out

#### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Edit product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

#### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add product to cart
- `DELETE /api/cart/remove/:productId` - Remove from cart
- `PUT /api/cart/update/:productId` - Update quantity

---

## 🎨 Frontend (Arturo)

### Main Dependencies

- `react` - Core library
- `react-router-dom` - Navigation between pages
- `axios` - HTTP client for requests
- `tailwindcss` - CSS framework
- `vite` - Build tool

### Main Pages

- **Home**: Landing page with featured products
- **Products**: Complete product listing
- **ProductDetail**: Detailed product information
- **Cart**: Shopping cart view
- **Login**: Sign in form
- **Signup**: Registration form
- **AdminDashboard**: Admin panel (create, edit, delete products)
- **Checkout**: Purchase page (optional)

---

## 🔄 Communication Flow

```
Frontend (React)
       ↓
  HTTP Request (Axios)
       ↓
Backend (Express API)
       ↓
Database (MongoDB)
       ↓
Backend Response
       ↓
Frontend Update
```

---

## 🚀 Getting Started

### Backend (Carlos)

1. Navigate to `backend` folder
2. Run `npm install`
3. Create `.env` file with MongoDB configuration
4. Run `npm start` or `npm run dev`

### Frontend (Arturo)

1. Navigate to `frontend` folder
2. Run `npm install`
3. Create `.env` file with backend URL
4. Run `npm run dev`

---

## 📝 Important Notes

- **No Stripe Integration**: Project does not include Stripe payment integration as specified
- **Environment Variables**: Create `.env` files based on `.env.example`
- **Regular Commits**: Make frequent commits with clear messages
- **Communication**: Coordinate changes in models/APIs to ensure compatibility

---

## 🔐 Security

- Passwords always encrypted (bcryptjs)
- JWT for authentication
- Authentication middleware on protected routes
- Sensitive variables in `.env` (never in code)

---

**Good luck! 🚀**
