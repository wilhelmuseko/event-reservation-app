const express = require('express');
const router = express.Router();
const locationRoutes = require('./routes/location');
const eventRoutes = require('./routes/event');
const transactionRoutes = require('./routes/transaction');
router.use('/location', locationRoutes);
router.use('/event', eventRoutes);
router.use('/transaction', transactionRoutes);
module.exports = router;
