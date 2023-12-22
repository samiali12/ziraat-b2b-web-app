// Controller function to calculate total sales of a user
const Sales = require('../models/salesModel');

const getSalesRecord = async (req, res) => {
  const { sellerId } = req.params; // Assuming the sellerId is passed as a parameter

  try {
    // Fetch all sales records for the given sellerId
    const userSales = await Sales.find({ seller: sellerId });

    // Calculate total sales amount
    let totalSales = 0;
    userSales.forEach((sale) => {
      totalSales += sale.amount;
    });

    // Get initial revenue for the user
    const revenueInitial = await getInitialRevenue(sellerId);

    // Calculate percentage change in revenue
    let percentageChange = null;
    if (revenueInitial !== null && revenueInitial !== undefined && revenueInitial !== 0) {
        percentageChange = (((totalSales - revenueInitial) / revenueInitial) * 100).toFixed(2);
    }

    return res.status(200).json({userSales, totalSales , percentageChange });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to calculate total sales' });
  }
};

const getInitialRevenue = async (sellerId) => {
    try {
      const earliestSale = await Sales.findOne({ seller: sellerId }).sort('date').exec();
      if (earliestSale) {
        return earliestSale.amount;
      }
      return 0; // If no sale is found, assume initial revenue as 0
    } catch (error) {
      throw new Error('Error fetching initial revenue');
    }
  };

module.exports = {
    getSalesRecord,
};
