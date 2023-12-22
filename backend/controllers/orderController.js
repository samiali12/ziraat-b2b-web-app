const Order = require('../models/orderModel')


const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params; // Assuming orderId is passed in the URL
    const { status } = req.body; // New status to update
  
    try {
      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      return res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
      console.error('Error updating order status:', error);
      return res.status(500).json({ error: 'Failed to update order status' });
    }
  };


module.exports = {
    updateOrderStatus
}