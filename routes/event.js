const express = require('express');
const router = express.Router();
const controller = require('../controller/index');
const eventTicketRoutes = require('./ticket');
const repository = require('../repository/index');
const {
  dateTimeFormatValidation,
  lengthValidation,
  requiredValidation,
  idExistsValidation,
} = require('../common_utils/validator');

router.get('/get_info', controller.event.getAll);
router.get('/get_info/:id', controller.event.getById);
router.post(
  '/create',
  dateTimeFormatValidation('start_date')
    .custom((value, { req }) => value < req.body.end_date)
    .withMessage('Start date must be before end date'),
  dateTimeFormatValidation('end_date'),
  requiredValidation('name'),
  lengthValidation('name', 1, 50),
  requiredValidation('location_id'),
  idExistsValidation('location_id', repository.location),
  controller.event.save
);
router.use('/ticket', eventTicketRoutes);
module.exports = router;
