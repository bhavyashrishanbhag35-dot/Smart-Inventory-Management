import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    reorderLevel: "",
    supplier: ""
  });

  const [loading, setLoading] = useState(true);

  // Get product from MongoDB
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);

        setProduct({
          productName: response.data.productName,
          category: response.data.category,
          price: response.data.price,
          quantity: response.data.quantity,
          reorderLevel: response.data.reorderLevel,
          supplier: response.data.supplier
        });

      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, {
        productName: product.productName,
        category: product.category,
        price: Number(product.price),
        quantity: Number(product.quantity),
        reorderLevel: Number(product.reorderLevel),
        supplier: product.supplier
      });

      alert("Product updated successfully");

      navigate("/products");

    } catch (error) {
      console.error("Update error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update product"
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <h2>Edit Product</h2>

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
                className="btn btn-success me-2"
              >
                Update Product
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

export default EditProduct;