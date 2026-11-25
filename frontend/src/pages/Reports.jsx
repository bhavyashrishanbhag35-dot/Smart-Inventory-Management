import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    try {
      setLoading(true);

      const response = await API.get("/reports");

      setReport(response.data);
    } catch (error) {
      console.error("Report error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to generate report"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-content">

          <div className="page-header">
            <div>
              <h2>Reports</h2>

              <p className="text-muted">
                Generate inventory and sales reports
              </p>
            </div>

            <button
              className="btn btn-primary"
              onClick={generateReport}
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Report"}
            </button>
          </div>

          {!report ? (
            <div className="dashboard-card">
              <p className="text-muted">
                Click "Generate Report" to generate the
                latest inventory and sales report.
              </p>
            </div>
          ) : (
            <>
              {/* Summary */}
              <div className="stats-grid">

                <div className="stat-card">
                  <div className="stat-icon">
                    📦
                  </div>

                  <div>
                    <p className="stat-title">
                      Total Products
                    </p>

                    <h2>
                      {report.summary.totalProducts}
                    </h2>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    🏭
                  </div>

                  <div>
                    <p className="stat-title">
                      Total Stock
                    </p>

                    <h2>
                      {report.summary.totalStock}
                    </h2>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    💰
                  </div>

                  <div>
                    <p className="stat-title">
                      Total Sales
                    </p>

                    <h2>
                      ₹{report.summary.totalSales}
                    </h2>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    📈
                  </div>

                  <div>
                    <p className="stat-title">
                      Units Sold
                    </p>

                    <h2>
                      {report.summary.totalUnitsSold}
                    </h2>
                  </div>
                </div>

              </div>

              {/* Stock Alerts */}
              <div className="dashboard-card mt-4">

                <h4>Inventory Alerts</h4>

                <div className="row mt-3">

                  <div className="col-md-6">

                    <div className="alert alert-warning">
                      <strong>
                        Low Stock Products
                      </strong>

                      <h3>
                        {report.summary.lowStock}
                      </h3>
                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="alert alert-danger">
                      <strong>
                        Out of Stock Products
                      </strong>

                      <h3>
                        {report.summary.outOfStock}
                      </h3>
                    </div>

                  </div>

                </div>

              </div>

              {/* Sales Report */}
              <div className="dashboard-card mt-4">

                <h4>Sales Report</h4>

                {report.sales.length === 0 ? (
                  <p className="text-muted mt-3">
                    No sales recorded.
                  </p>
                ) : (
                  <div className="table-responsive mt-3">

                    <table className="table table-hover">

                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                          <th>Date</th>
                        </tr>
                      </thead>

                      <tbody>

                        {report.sales.map(
                          (sale, index) => (
                            <tr key={sale._id}>

                              <td>
                                {index + 1}
                              </td>

                              <td>
                                {sale.productId
                                  ?.productName ||
                                  "Deleted Product"}
                              </td>

                              <td>
                                {sale.productId
                                  ?.category || "-"}
                              </td>

                              <td>
                                {sale.quantity}
                              </td>

                              <td>
                                ₹{sale.totalAmount}
                              </td>

                              <td>
                                {new Date(
                                  sale.saleDate
                                ).toLocaleDateString()}
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

              </div>

              <p className="text-muted mt-3">
                Report generated on:{" "}
                {new Date(
                  report.generatedAt
                ).toLocaleString()}
              </p>

            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default Reports;