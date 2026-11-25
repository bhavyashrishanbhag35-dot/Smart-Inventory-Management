import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const response = await API.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      alert("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const getStockStatus = (product) => {
    if (product.quantity === 0) {
      return {
        text: "Out of Stock",
        className: "badge bg-danger"
      };
    }

    if (product.quantity <= product.reorderLevel) {
      return {
        text: "Low Stock",
        className: "badge bg-warning text-dark"
      };
    }

    return {
      text: "In Stock",
      className: "badge bg-success"
    };
  };

  const totalStock = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const lowStock = products.filter(
    (product) =>
      product.quantity > 0 &&
      product.quantity <= product.reorderLevel
  ).length;

  const outOfStock = products.filter(
    (product) => product.quantity === 0
  ).length;

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="page-content">

          <div className="page-header">
            <div>
              <h2>Inventory</h2>
              <p className="text-muted">
                Current inventory and stock status
              </p>
            </div>
          </div>

          {/* Inventory Summary */}

          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon">📦</div>

              <div>
                <p className="stat-title">
                  Total Products
                </p>

                <h2>{products.length}</h2>

                <small>
                  Products in inventory
                </small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏭</div>

              <div>
                <p className="stat-title">
                  Total Stock
                </p>

                <h2>{totalStock}</h2>

                <small>
                  Units available
                </small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⚠️</div>

              <div>
                <p className="stat-title">
                  Low Stock
                </p>

                <h2>{lowStock}</h2>

                <small>
                  Products need reordering
                </small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">❌</div>

              <div>
                <p className="stat-title">
                  Out of Stock
                </p>

                <h2>{outOfStock}</h2>

                <small>
                  Products unavailable
                </small>
              </div>
            </div>

          </div>

          {/* Inventory Table */}

          <div className="dashboard-card mt-4">

            <h4>Current Inventory</h4>

            {loading ? (
              <p className="mt-3">
                Loading inventory...
              </p>
            ) : products.length === 0 ? (
              <p className="text-muted mt-3">
                No products available.
              </p>
            ) : (
              <div className="table-responsive mt-3">

                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Current Stock</th>
                      <th>Reorder Level</th>
                      <th>Supplier</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {products.map((product, index) => {

                      const status =
                        getStockStatus(product);

                      return (
                        <tr key={product._id}>

                          <td>{index + 1}</td>

                          <td>
                            <strong>
                              {product.productName}
                            </strong>
                          </td>

                          <td>
                            {product.category}
                          </td>

                          <td>
                            ₹{product.price}
                          </td>

                          <td>
                            {product.quantity}
                          </td>

                          <td>
                            {product.reorderLevel}
                          </td>

                          <td>
                            {product.supplier}
                          </td>

                          <td>
                            <span className={status.className}>
                              {status.text}
                            </span>
                          </td>

                        </tr>
                      );
                    })}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}

export default Inventory;