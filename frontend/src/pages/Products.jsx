import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/products/${id}`);

      alert("Product deleted successfully");

      // Reload products from MongoDB
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
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
              <h2>Products</h2>
              <p className="text-muted">
                Manage all products
              </p>
            </div>

            <Link
              to="/products/add"
              className="btn btn-primary"
            >
              + Add Product
            </Link>
          </div>

          <div className="dashboard-card">

            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-muted">
                No products found.
              </p>
            ) : (
              <div className="table-responsive">

                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Reorder Level</th>
                      <th>Supplier</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {products.map((product, index) => (

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

                          <Link
                            to={`/products/edit/${product._id}`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            Edit
                          </Link>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              deleteProduct(product._id)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

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

export default Products;