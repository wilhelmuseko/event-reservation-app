const express = require('express');
const router = express.Router();
const controller = require('../controller/index');
const eventTicketRoutes = require('./ticket');

router.get('/get_info', controller.event.getAll);
router.get('/get_info/:id', controller.event.getById);
router.post('/create', controller.event.save);
router.use('/ticket', eventTicketRoutes);
module.exports = router;