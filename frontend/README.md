# Smart Inventory Management and Demand Analysis System using MongoDB

## 📌 Project Overview

The **Smart Inventory Management and Demand Analysis System** is a web-based application developed to simplify inventory operations, manage product records, track sales transactions, and analyze product demand.

The system allows users to add, update, delete, and view products, monitor stock availability, record sales transactions, generate reports, and analyze monthly product demand through graphical representations.

MongoDB is used as the database to store and manage product and sales information efficiently. The application helps improve inventory management and supports better decision-making through sales and demand analysis.

## 🎯 Objectives

- To develop a centralized system for managing inventory and product information.
- To maintain accurate product and stock records.
- To track sales transactions and update inventory efficiently.
- To analyze product demand based on historical sales data.
- To visualize monthly sales trends through graphical representations.
- To generate reports for better inventory management and decision-making.

## 🚀 Key Features

- **Dashboard:** Provides an overview of inventory and sales information.
- **Product Management:** Add, view, update, and delete product details.
- **Inventory Management:** Monitor available stock quantities and maintain inventory records.
- **Sales Management:** Record sales transactions and maintain sales history.
- **Demand Analysis:** Analyze product demand using recorded sales data.
- **Monthly Sales Analysis:** Visualize monthly sales trends through graphical charts.
- **Reports:** Generate reports based on inventory and sales information.
- **Database Management:** Store and retrieve product and sales information using MongoDB.

## 🛠️ Technologies Used

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- MongoDB Atlas

### Development Tools
- Visual Studio Code
- Postman
- Git
- GitHub

## 📂 Project Structure

```text
BDA/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Statcard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AddProduct.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DemandAnalysis.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── Sales.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── dashboardController.js
│   │   ├── demandController.js
│   │   ├── productController.js
│   │   ├── reportController.js
│   │   └── salesController.js
│   │
│   ├── models/
│   │   ├── Product.js
│   │   └── Sale.js
│   │
│   ├── routes/
│   │   ├── dashboardRoutes.js
│   │   ├── demandRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reportRoutes.js
│   │   └── salesRoutes.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
└── README.md
```

**Note:** The `node_modules` and `.env` files are excluded from the repository structure because they should not be uploaded to GitHub.

## ⚙️ Installation and Setup

### Prerequisites

Make sure the following software is installed:

- Node.js and npm
- MongoDB Atlas account or local MongoDB installation
- Visual Studio Code
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/bhavyashrishanbhag35-dot/Smart-Inventory-Management.git
```

### 2. Navigate to the Project Directory

```bash
cd Smart-Inventory-Management
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB URI with your actual database connection string.

**Important:** Keep the `.env` file private. Do not upload database credentials or passwords to GitHub.

### 5. Start the Backend Server

```bash
npm run dev
```

### 6. Install Frontend Dependencies

Open a new terminal from the project directory:

```bash
cd frontend
npm install
```

### 7. Start the Frontend Application

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

*Note: Ensure that the commands match the scripts defined in your frontend and backend package.json files.*

## 🗄️ Database Description

MongoDB is used as the primary database for storing and managing application data.

The system uses the following main collections/models:

**1. Product Model**
- Stores product-related information.
- Maintains product details and inventory records.
- Supports product management operations.

**2. Sale Model**
- Stores sales transaction information.
- Maintains sales history.
- Supports monthly sales and demand analysis.

The backend uses separate models, controllers, and routes to organize database operations and application functionality.

## 📊 Demand Analysis

The Demand Analysis module analyzes recorded sales transactions to understand product demand patterns.

It uses historical sales data to provide monthly demand analysis and graphical representations of sales trends.

This helps users understand product sales patterns and make informed inventory planning decisions.

## 🔮 Future Enhancements

- Machine learning-based product demand forecasting.
- Automated low-stock notifications.
- Smart inventory restocking recommendations.
- Advanced sales analytics and visualization.
- Improved inventory optimization.

## 👩‍💻 Author

**Bhavyashri Shanbhag**

GitHub Profile: https://github.com/bhavyashrishanbhag35-dot

## 📜 License

This project was developed for academic purposes as part of a Database Management System project.
