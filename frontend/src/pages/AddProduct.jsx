import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    reorderLevel: "",
    supplier: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        productName: product.productName,
        category: product.category,
        price: Number(product.price),
        quantity: Number(product.quantity),
        reorderLevel: Number(product.reorderLevel),
        supplier: product.supplier
      });

      alert("Product added successfully");

      // Go back to Products page
      navigate("/products");

    } catch (error) {
      console.error("Add product error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );
    }
  };

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <h2>Add Product</h2>

          <div className="form-card">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">
                  Product Name
                </label>

                <input
                  type="text"
                  name="productName"
                  className="form-control"
                  value={product.productName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={product.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={product.quantity}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Reorder Level
                </label>

                <input
                  type="number"
                  name="reorderLevel"
                  className="form-control"
                  value={product.reorderLevel}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Supplier
                </label>

                <input
                  type="text"
                  name="supplier"
                  className="form-control"
                  value={product.supplier}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary me-2"
              >
                Add Product
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/products")}
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AddProduct;