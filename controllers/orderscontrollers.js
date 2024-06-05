const Joi = require('joi');
const Order = require('../models/Orders');

// Schéma de validation pour les commandes
const orderSchema = Joi.object({
  item: Joi.string().min(1).required(),
  quantity: Joi.number().integer().min(1).required()
});

const placeOrder = async (req, res) => {
  // Validation des données de la commande
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // Création et sauvegarde de la commande dans la base de données
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder
    });
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err });
  }
};

module.exports = {placeOrder};

