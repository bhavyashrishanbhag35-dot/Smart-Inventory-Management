const Sale = require("../models/Sale");
const Product = require("../models/Product");

// Get all sales
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("productId", "productName category price")
      .sort({ saleDate: -1 });

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sales",
      error: error.message
    });
  }
};

// Record sale
const createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock"
      });
    }

    const totalAmount = product.price * quantity;

    const sale = await Sale.create({
      productId,
      quantity,
      totalAmount
    });

    product.quantity -= quantity;
    await product.save();

    const populatedSale = await Sale.findById(sale._id)
      .populate("productId", "productName category price");

    res.status(201).json({
      message: "Sale recorded successfully",
      sale: populatedSale
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to record sale",
      error: error.message
    });
  }
};

module.exports = {
  getSales,
  createSale
};