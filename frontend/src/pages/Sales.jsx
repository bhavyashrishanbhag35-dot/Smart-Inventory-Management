import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);

  const [sale, setSale] = useState({
    productId: "",
    quantity: ""
  });

  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    try {
      const response = await API.get("/sales");
      setSales(response.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
      alert("Failed to load sales");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setSale({
      ...sale,
      [e.target.name]: e.target.value
    });
  };

  const handleRecordSale = async (e) => {
    e.preventDefault();

    if (!sale.productId || !sale.quantity) {
      alert("Please select a product and enter quantity");
      return;
    }

    try {
      await API.post("/sales", {
        productId: sale.productId,
        quantity: Number(sale.quantity)
      });

      alert("Sale recorded successfully");

      setSale({
        productId: "",
        quantity: ""
      });

      await fetchSales();
      await fetchProducts();
    } catch (error) {
      console.error("Record sale error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to record sale"
      );
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
              <h2>Sales</h2>
              <p className="text-muted">
                Record and manage product sales
              </p>
            </div>
          </div>

          {/* Record Sale */}
          <div className="form-card mb-4">
            <h4>Record Sale</h4>

            <form onSubmit={handleRecordSale}>

              <div className="mb-3">
                <label className="form-label">
                  Product
                </label>

                <select
                  name="productId"
                  className="form-select"
                  value={sale.productId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Product
                  </option>

                  {products.map((product) => (
                    <option
                      key={product._id}
                      value={product._id}
                    >
                      {product.productName} - Stock:{" "}
                      {product.quantity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Quantity Sold
                </label>

                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={sale.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Record Sale
              </button>

            </form>
          </div>

          {/* Sales Table */}
          <div className="dashboard-card">

            <h4>Sales History</h4>

            {loading ? (
              <p>Loading sales...</p>
            ) : sales.length === 0 ? (
              <p className="text-muted">
                No sales recorded yet.
              </p>
            ) : (
              <div className="table-responsive">

                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Total Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>

                    {sales.map((item, index) => (
                      <tr key={item._id}>

                        <td>{index + 1}</td>

                        <td>
                          <strong>
                            {item.productId?.productName ||
                              "Deleted Product"}
                          </strong>
                        </td>

                        <td>
                          {item.productId?.category || "-"}
                        </td>

                        <td>{item.quantity}</td>

                        <td>
                          ₹{item.totalAmount}
                        </td>

                        <td>
                          {new Date(
                            item.saleDate
                          ).toLocaleDateString()}
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

export default Sales;