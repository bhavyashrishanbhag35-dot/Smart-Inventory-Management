const express = require("express");

const {
  getDemandAnalysis,
  getMonthlyDemand
} = require("../controllers/demandController");

const router = express.Router();

// Register the monthly endpoint
router.get("/monthly", getMonthlyDemand);

// Existing endpoint
router.get("/", getDemandAnalysis);

module.exports = router;