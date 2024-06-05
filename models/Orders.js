const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
    delivery: Boolean,
    deliveryFee: Number,
    totalPrice: Number,
    status: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', orderSchema);
