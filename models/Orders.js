
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
