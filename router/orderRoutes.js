// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
const Users = require('../models/Users');
const Dish = require('../models/Dish');

//  créer une commande
router.post('/orders', async (req, res) => {
    const { userId, dishIds, delivery } = req.body;

    try {
        const user = await Users.findById(userId);
        const dishes = await Dish.find({ '_id': { $in: dishIds } });

        if (!user || dishes.length === 0) {
            return res.status(400).json({ error: 'Invalid user or dishes' });
        }

        let totalPrice = dishes.reduce((total, dish) => total + dish.price, 0);
        const deliveryFee = delivery ? 5.00 : 0;  // 

        totalPrice += deliveryFee;

        const newOrder = new Order({
            user: userId,
            dishes: dishIds,
            delivery: delivery,
            deliveryFee: deliveryFee,
            totalPrice: totalPrice,
            status: 'pending'
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// la commande
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('dishes');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// tous les  commandes
router.get('/orders', async (req, res) => {
    try {
        const order = await Order.find({}).populate('user').populate('dishes');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});
// mettre à jour une commande
router.put('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user').populate('dishes');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});

// mettre à jour des commandes
router.put('/orders', async (req, res) => {
    try {
        const order = await Order.findAndUpdate( req.body, { new: true }).populate('user').populate('dishes');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});


// supprimer une commande
router.delete('/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

// supprimer des commandes
router.delete('/orders', async (req, res) => {
    try {
        const order = await Order.findAndDelete({});
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

module.exports = router;
