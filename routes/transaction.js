const express = require('express');
const router = express.Router();
const controller = require('../controller/index');

router.post('/create', controller.transaction.save);
router.get('/get_info', controller.transaction.getAll);
module.exports = router;
