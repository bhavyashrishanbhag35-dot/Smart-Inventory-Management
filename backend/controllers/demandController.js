const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const Product = require("../models/Product");

const getMonthlyDemand = async (req, res) => {
  try {
    const { productId } = req.query;

    // Validate the selected product ID
    if (
      productId &&
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    // Calculate the date range for the last 12 months,
    // including the current month.
    const now = new Date();

    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - 11,
      1
    );

    const match = {
      saleDate: { $gte: startDate }
    };

    if (productId) {
      match.productId = new mongoose.Types.ObjectId(
        productId
      );
    }

    // Aggregate real sales by calendar month.
    const results = await Sale.aggregate([
      { $match: match },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$saleDate",
              timezone: "Asia/Kolkata"
            }
          },

          totalUnits: {
            $sum: "$quantity"
          },

          totalRevenue: {
            $sum: "$totalAmount"
          },

          numberOfSales: {
            $sum: 1
          }
        }
      },

      {
        $sort: {
          _id: 1
        }
      }
    ]);

    // Convert aggregation results to a lookup.
    const monthlyMap = {};

    results.forEach((item) => {
      monthlyMap[item._id] = {
        totalUnits: item.totalUnits,
        totalRevenue: item.totalRevenue,
        numberOfSales: item.numberOfSales
      };
    });

    // Generate all 12 months so months without sales
    // appear as zero rather than disappearing.
    const monthlyData = [];

    for (let i = 0; i < 12; i++) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - 11 + i,
        1
      );

      const year = date.getFullYear();

      const month = String(
        date.getMonth() + 1
      ).padStart(2, "0");

      const key = `${year}-${month}`;

      monthlyData.push({
        month: key,
        totalUnits:
          monthlyMap[key]?.totalUnits || 0,
        totalRevenue:
          monthlyMap[key]?.totalRevenue || 0,
        numberOfSales:
          monthlyMap[key]?.numberOfSales || 0
      });
    }

    res.status(200).json({
      productId: productId || null,
      monthlyData
    });
  } catch (error) {
    console.error(
      "Monthly demand error:",
      error
    );

    res.status(500).json({
      message: "Failed to calculate monthly demand",
      error: error.message
    });
  }
};

// Keep the existing product demand endpoint if
// other pages still use it.
const getDemandAnalysis = async (req, res) => {
  try {
    const products = await Product.find().lean();
    const sales = await Sale.find().lean();

    const demandMap = {};

    products.forEach((product) => {
      demandMap[product._id.toString()] = {
        productId: product._id,
        productName: product.productName,
        category: product.category,
        currentStock: product.quantity,
        totalQuantity: 0,
        totalSales: 0
      };
    });

    sales.forEach((sale) => {
      const id = sale.productId.toString();

      if (!demandMap[id]) return;

      demandMap[id].totalQuantity += sale.quantity;
      demandMap[id].totalSales += sale.totalAmount;
    });

    res.status(200).json(Object.values(demandMap));
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate demand",
      error: error.message
    });
  }
};

module.exports = {
  getDemandAnalysis,
  getMonthlyDemand
};