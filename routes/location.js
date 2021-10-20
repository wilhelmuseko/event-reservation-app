const express = require('express');
const router = express.Router();
const controller = require('../controller/index');

router.get('/', controller.location.getAll);
router.get('/:id', controller.location.getById);
router.post('/create', controller.location.save);
module.exports = router;
