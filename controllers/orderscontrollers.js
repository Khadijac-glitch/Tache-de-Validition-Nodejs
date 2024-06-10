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


//  j'ai utiliser la  bibliothèque "Joi" pour valider les données de la commande.
// Joi fournit un ensemble de fonctions pour définir et valider des schémas de données.

// Joi.object({...}) : Crée un schéma d'objet. L'objet passé à cette méthode définit les propriétés et les règles de validation de l'objet de commande.

// item: Joi.string().min(1).required() :

// Joi.string() : Spécifie que item doit être une chaîne de caractères.
// min(1) : La chaîne doit avoir au moins 1 caractère.
// required() : La propriété item est obligatoire, ce qui signifie qu'elle doit être présente dans l'objet validé.
// quantity: Joi.number().integer().min(1).required() :

// Joi.number() : Spécifie que quantity doit être un nombre.
// integer() : Le nombre doit être un entier.
// min(1) : La valeur de quantity doit être au moins 1.
// required() : La propriété quantity est obligatoire.

// Le schéma défini avec Joi permet de valider que les objets de commande contiennent une chaîne de caractères item non vide et un entier quantity supérieur ou égal à 1

// dans ce schema ce schéma le contrôleur, va assurer que seules les données valides sont traitées, réduisant ainsi les risques d'erreurs et améliorant la robustesse de votre application.