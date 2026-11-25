import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import DemandAnalysis from "./pages/DemandAnalysis";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/add" element={<AddProduct />} />

        <Route
          path="/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/sales"
          element={<Sales />}
        />

        <Route
          path="/demand-analysis"
          element={<DemandAnalysis />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;