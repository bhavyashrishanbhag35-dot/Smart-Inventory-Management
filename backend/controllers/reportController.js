const Product = require("../models/Product");
const Sale = require("../models/Sale");

const generateReport = async (req, res) => {
  try {
    const products = await Product.find();

    const sales = await Sale.find()
      .populate("productId", "productName category price")
      .sort({ saleDate: -1 });

    const totalProducts = products.length;

    const totalStock = products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    const lowStock = products.filter(
      product =>
        product.quantity > 0 &&
        product.quantity <= product.reorderLevel
    );

    const outOfStock = products.filter(
      product => product.quantity === 0
    );

    const totalSales = sales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0
    );

    const totalUnitsSold = sales.reduce(
      (sum, sale) => sum + sale.quantity,
      0
    );

    res.status(200).json({
      generatedAt: new Date(),

      summary: {
        totalProducts,
        totalStock,
        lowStock: lowStock.length,
        outOfStock: outOfStock.length,
        totalSales,
        totalUnitsSold
      },

      lowStockProducts: lowStock,

      outOfStockProducts: outOfStock,

      sales
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate report",
      error: error.message
    });
  }
};

module.exports = {
  generateReport
};