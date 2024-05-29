const express = require('express');
const router = express.Router();

// la route pour obtenir un rapport
router.get('/sales', async (req, res) => {
    try {
        // la Logique pour obtenir les données de vente
        const salesReport = {
            totalSales: 1000,
            totalOrders: 50,
            topProduct: 'Product A'
        };

        res.json(salesReport);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching sales report', error: err.message });
    }
});

module.exports = router;
