const express = require('express');
const {
  idExistsValidation,
  requiredValidation,
  lengthValidation,
  numberMinValueValidation,
} = require('../common_utils/validator');
const { body } = require('express-validator');
const router = express.Router();
const controller = require('../controller/index');
const service = require('../services/index');

router.post(
  '/create',
  body()
    .isArray({ min: 1 })
    .withMessage('Request body must be an array and minimum 1 item.'),
  requiredValidation('*.event_id'),
  requiredValidation('*.type'),
  requiredValidation('*.quota'),
  requiredValidation('*.price'),
  idExistsValidation('*.event_id', service.event.getAll()),
  lengthValidation('*.type', 1, 16),
  body('*.type')
    .if((value, { req }) => value && req.body.length && req.body[0].event_id)
    .custom(async (value, { req }) => {
      for (var ticket of req.body) {
        const record = await service.eventTicket.findOneWithCondition({
          type: value,
          event_id: ticket.event_id,
        });
        if (record) {
          return Promise.reject(
            `Type ${value} is already exist in database for this event.`
          );
        }
      }
      return true;
    }),
  numberMinValueValidation('*.quota', 1),
  numberMinValueValidation('*.price', 0),
  controller.eventTicket.save
);
module.exports = router;
