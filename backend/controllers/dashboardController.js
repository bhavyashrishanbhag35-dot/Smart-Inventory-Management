const Product = require("../models/Product");
const Sale = require("../models/Sale");

const getDashboard = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    const lowStock = products.filter(
      product =>
        product.quantity > 0 &&
        product.quantity <= product.reorderLevel
    ).length;

    const outOfStock = products.filter(
      product => product.quantity === 0
    ).length;

    const sales = await Sale.find();

    const totalSales = sales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0
    );

    res.status(200).json({
      totalProducts,
      totalStock,
      lowStock,
      outOfStock,
      totalSales
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error: error.message
    });
  }
};

module.exports = {
  getDashboard
};