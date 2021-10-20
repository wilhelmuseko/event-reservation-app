const express = require('express');
const services = require('../services/index');
const router = express.Router();

router.get('/', async (req, res) => {
  const data = await services.location.getAll();
  res.json(data);
});

module.exports = router;
