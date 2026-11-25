import { NavLink } from "react-router-dom";

function Sidebar() {

  return (
    <div className="sidebar">

      <div className="sidebar-title">
        Smart Inventory
      </div>

      <div className="sidebar-subtitle">
        Management System
      </div>

      <hr />

      <NavLink to="/dashboard">
        📊 Dashboard
      </NavLink>

      <NavLink to="/products">
        📦 Products
      </NavLink>

      <NavLink to="/inventory">
        🏭 Inventory
      </NavLink>

      <NavLink to="/sales">
        💰 Sales
      </NavLink>

      <NavLink to="/demand-analysis">
        📈 Demand Analysis
      </NavLink>

      <NavLink to="/reports">
        📄 Reports
      </NavLink>

    </div>
  );
}

export default Sidebar;