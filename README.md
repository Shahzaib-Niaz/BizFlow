# BizFlow — Business Operations Management Dashboard

BizFlow is a modern business operations management dashboard built with React. The project is designed to simulate a real-world SaaS-style business application where customers, products/services, orders, and internal tasks are managed from one centralized interface.

The current version focuses on the **frontend experience, component architecture, local state management, CRUD workflows, routing, and responsive UI**. API and backend integration are planned as the next development phase.

## 🚀 Live Project Concept

BizFlow is intended for small and medium-sized businesses that need a simple place to manage day-to-day operations.

The application brings together:

- Business overview and key metrics
- Customer management
- Customer detail views
- Product/service management
- Order management
- Internal task management
- Account and notification settings

The project is intentionally designed to grow from a frontend prototype into a full-stack MERN application.

## ✨ Current Features

### 📊 Dashboard

- Business overview
- Revenue summary
- Order statistics
- Customer statistics
- Active task count
- Revenue overview section
- Recent orders

### 👥 Customers

- Customer listing
- Customer search
- Create customer
- Edit customer
- Delete customer
- Customer status
- Customer detail page
- Dynamic customer routes using `/customers/:id`

### 📦 Products

- Product/service listing
- Search products
- Product categories
- Pricing
- Stock information
- Product status
- Create, update, and delete products

### 🛒 Orders

- Order management
- Customer and product relationships
- Quantity management
- Automatic order total calculation
- Order status management
- Search orders
- Status filtering
- Create, update, and delete orders

### ✅ Tasks

- Internal business task management
- Tasks connected to customers
- Assignee information
- Priority levels
- Due dates
- Task status
- Search
- Status filtering
- Priority filtering
- Create, update, and delete tasks

### ⚙️ Settings

- Profile information
- Notification preferences
- Password management interface

### 📱 Responsive UI

- Responsive dashboard layout
- Desktop sidebar
- Mobile sidebar drawer
- Responsive tables and forms
- Mobile-friendly navigation

### 🧭 Routing

The project uses modern React Router patterns including:

- `createBrowserRouter`
- `RouterProvider`
- `Outlet`
- Dynamic routes
- Nested routes
- 404 handling

## 🛠️ Tech Stack

- **React.js**
- **Vite**
- **JavaScript (ES6+)**
- **Tailwind CSS**
- **React Router**
- **Lucide React**

## 🏗️ Frontend Architecture

The current frontend is organized around pages, reusable UI components, layout components, local data, and routing.

```text
src/
│
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── pages/
│   └── ui/
│
├── data/
│   ├── Customers.js
│   ├── Products.js
│   ├── Orders.js
│   └── Tasks.js
│
├── routes/
│   └── AppRoutes.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

The current data flow is:

```text
Local Data
    ↓
React State
    ↓
Page Components
    ↓
Reusable UI Components
    ↓
User Interaction
    ↓
State Updates
    ↓
Updated UI
```

## 🔗 Business Relationships

BizFlow is not built as a collection of unrelated CRUD pages. The frontend already models relationships between major business entities.

```text
Customers
   ├── Orders
   └── Tasks

Products
   └── Orders
```

For example, an order stores a `customerId` and `productId`, while order totals are calculated from product price and quantity.

## 📚 React Concepts Practiced

This project is also a practical learning project focused on understanding real React development patterns.

- Functional components
- Props
- Component composition
- `useState`
- Controlled inputs
- Form handling
- CRUD operations
- Derived data
- Array methods such as `map`, `filter`, `find`, and `reduce`
- Conditional rendering
- Reusable modal components
- Dynamic routing
- Nested routing
- Responsive UI development
- Business logic inside frontend applications
- Component-based architecture

## 🎯 Project Goals

The main goal is to understand how a production-style React frontend is structured instead of only learning isolated React features.

The project is being developed progressively:

```text
UI Development
      ↓
Local CRUD
      ↓
Business Relationships
      ↓
Frontend Architecture
      ↓
API Integration
      ↓
Backend Integration
      ↓
Full MERN Application
```

## 🔮 Planned Next Phase

The current repository is **frontend-focused**. API integration has not yet been added.

Planned future improvements include:

- REST API integration
- API service layer
- Loading and error states
- Reusable data-fetching hooks
- Context API / `useReducer` where appropriate
- Authentication
- Node.js and Express backend
- MongoDB database
- JWT-based authentication
- Production API deployment

The goal is to eventually evolve the application into:

```text
React Frontend
      ↓
Node.js / Express API
      ↓
MongoDB
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/bizflow.git
cd bizflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will provide the local development URL in the terminal, typically:

```text
http://localhost:5173
```

## 📁 Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 👨‍💻 Developer Note

BizFlow is being developed as a practical portfolio and learning project with a strong focus on **frontend architecture, business logic, reusable components, and real-world application workflows**.

The objective is not only to make the interface look good, but to understand how the different parts of a business application fit together and how the frontend can later connect cleanly to a real backend.

## 📄 License

This project is currently intended as a personal learning and portfolio project.
