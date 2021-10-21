const express = require('express');
const {
  requiredValidation,
  lengthValidation,
  maxLengthValidation,
} = require('../common_utils/validator');
const router = express.Router();
const controller = require('../controller/index');

router.get('/', controller.location.getAll);
router.get('/:id', controller.location.getById);
router.post(
  '/create',
  requiredValidation('building_name'),
  requiredValidation('street_address'),
  requiredValidation('city'),
  requiredValidation('state'),
  lengthValidation('building_name', 1, 50),
  lengthValidation('street_address', 1, 250),
  lengthValidation('city', 1, 50),
  lengthValidation('state', 1, 50),
  maxLengthValidation('unit_no', 20),
  maxLengthValidation('postal_code', 16),
  controller.location.save
);
module.exports = router;
