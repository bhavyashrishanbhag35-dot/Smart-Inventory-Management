import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalStock: 0,
    lowStock: 0,
    outOfStock: 0,
    totalSales: 0
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/dashboard");

      setDashboard(response.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <h2>Dashboard</h2>

          <p className="text-muted">
            Overview of inventory, sales and product demand
          </p>

          {/* Statistics */}

          {loading ? (
            <p>Loading dashboard...</p>
          ) : (
            <div className="stats-grid">

              <StatCard
                title="Total Products"
                value={dashboard.totalProducts}
                description="Products registered"
                icon="📦"
              />

              <StatCard
                title="Total Stock"
                value={dashboard.totalStock}
                description="Units available"
                icon="🏭"
              />

              <StatCard
                title="Low Stock"
                value={dashboard.lowStock}
                description="Need reordering"
                icon="⚠️"
              />

              <StatCard
                title="Total Sales"
                value={`₹${dashboard.totalSales}`}
                description="Total sales amount"
                icon="💰"
              />

            </div>
          )}

          {/* Inventory Summary */}

          <div className="dashboard-card">

            <h4>Inventory Summary</h4>

            <div className="row mt-3">

              <div className="col-md-4">
                <div className="alert alert-success">
                  <strong>Available Stock</strong>
                  <br />
                  {dashboard.totalStock} units
                </div>
              </div>

              <div className="col-md-4">
                <div className="alert alert-warning">
                  <strong>Low Stock</strong>
                  <br />
                  {dashboard.lowStock} products
                </div>
              </div>

              <div className="col-md-4">
                <div className="alert alert-danger">
                  <strong>Out of Stock</strong>
                  <br />
                  {dashboard.outOfStock} products
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;