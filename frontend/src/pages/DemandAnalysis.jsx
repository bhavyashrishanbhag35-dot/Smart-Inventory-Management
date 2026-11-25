import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function DemandAnalysis() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Products error:", err);
      setError("Failed to load products.");
    }
  };

  const fetchMonthlyDemand = async (selectedProductId) => {
    setLoading(true);
    setError("");

    try {
      const response = await API.get(
        "/demand-analysis/monthly",
        {
          params: selectedProductId
            ? { productId: selectedProductId }
            : {}
        }
      );

      setMonthlyData(response.data.monthlyData);
    } catch (err) {
      console.error("Monthly demand error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load monthly demand."
      );

      setMonthlyData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchMonthlyDemand(productId);
  }, [productId]);

  const totalUnits = monthlyData.reduce(
    (sum, item) => sum + item.totalUnits,
    0
  );

  const totalRevenue = monthlyData.reduce(
    (sum, item) => sum + item.totalRevenue,
    0
  );

  const totalTransactions = monthlyData.reduce(
    (sum, item) => sum + item.numberOfSales,
    0
  );

  // Format YYYY-MM as a readable month.
  const chartData = monthlyData.map((item) => {
    const [year, month] = item.month.split("-");

    const label = new Date(
      Number(year),
      Number(month) - 1,
      1
    ).toLocaleDateString("en-IN", {
      month: "short",
      year: "2-digit"
    });

    return {
      ...item,
      label
    };
  });

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-content">
          <div className="page-header">
            <div>
              <h2>Monthly Demand Analysis</h2>

              <p className="text-muted">
                Analyze actual product sales over the
                last 12 months
              </p>
            </div>

            <button
              className="btn btn-outline-primary"
              onClick={() => fetchMonthlyDemand(productId)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh Data"}
            </button>
          </div>

          {/* Product Filter */}
          <div className="dashboard-card mb-4">
            <label className="form-label">
              Select Product
            </label>

            <select
              className="form-select"
              value={productId}
              onChange={(e) =>
                setProductId(e.target.value)
              }
            >
              <option value="">
                All Products
              </option>

              {products.map((product) => (
                <option
                  key={product._id}
                  value={product._id}
                >
                  {product.productName}
                </option>
              ))}
            </select>

            <small className="text-muted">
              Choose a product to view its monthly
              demand, or select All Products.
            </small>
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {loading ? (
            <p>Loading monthly demand...</p>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>

                  <div>
                    <p className="stat-title">
                      Total Units Sold
                    </p>

                    <h2>{totalUnits}</h2>

                    <small>Last 12 months</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💰</div>

                  <div>
                    <p className="stat-title">
                      Total Revenue
                    </p>

                    <h2>
                      ₹
                      {totalRevenue.toLocaleString(
                        "en-IN",
                        { maximumFractionDigits: 2 }
                      )}
                    </h2>

                    <small>Last 12 months</small>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🧾</div>

                  <div>
                    <p className="stat-title">
                      Sales Transactions
                    </p>

                    <h2>{totalTransactions}</h2>

                    <small>Recorded sales</small>
                  </div>
                </div>
              </div>

              {/* Monthly Units Sold Chart */}
              <div className="dashboard-card mt-4">
                <h4>Monthly Product Demand</h4>

                <p className="text-muted">
                  Total units sold per month, based on
                  actual sales dates.
                </p>

                <div style={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="label" />

                      <YAxis
                        allowDecimals={false}
                        label={{
                          value: "Units Sold",
                          angle: -90,
                          position: "insideLeft"
                        }}
                      />

                      <Tooltip />

                      <Legend />

                      <Bar
                        dataKey="totalUnits"
                        name="Units Sold"
                        fill="#3b82f6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Revenue Chart */}
              <div className="dashboard-card mt-4">
                <h4>Monthly Sales Revenue</h4>

                <p className="text-muted">
                  Revenue generated by sales each month.
                </p>

                <div style={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="label" />

                      <YAxis />

                      <Tooltip
                        formatter={(value) =>
                          `₹${Number(value).toLocaleString(
                            "en-IN"
                          )}`
                        }
                      />

                      <Legend />

                      <Line
                        type="monotone"
                        dataKey="totalRevenue"
                        name="Revenue"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Data Table */}
              <div className="dashboard-card mt-4">
                <h4>Monthly Demand Records</h4>

                <div className="table-responsive mt-3">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Units Sold</th>
                        <th>Revenue</th>
                        <th>Transactions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {chartData.map((item) => (
                        <tr key={item.month}>
                          <td>{item.label}</td>
                          <td>{item.totalUnits}</td>
                          <td>
                            ₹
                            {item.totalRevenue.toLocaleString(
                              "en-IN",
                              {
                                maximumFractionDigits: 2
                              }
                            )}
                          </td>
                          <td>{item.numberOfSales}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default DemandAnalysis;