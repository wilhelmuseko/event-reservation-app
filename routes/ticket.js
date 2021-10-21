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
const repository = require('../repository/index');

router.post(
  '/create',
  requiredValidation('event_id'),
  requiredValidation('type'),
  requiredValidation('quota'),
  requiredValidation('price'),
  idExistsValidation('event_id', repository.event),
  lengthValidation('type', 1, 16),
  body('type')
    .if((value, { req }) => value && req.body.event_id)
    .custom((value, { req }) => {
      console.log(value, req.body.event_id);
      return repository.eventTicket
        .findOne({
          where: {
            type: value,
            event_id: req.body.event_id,
          },
        })
        .then((record) => {
          if (record) {
            return Promise.reject(
              `Type ${value} is already exist in database for this event.`
            );
          }
        });
    }),
  numberMinValueValidation('quota', 1),
  numberMinValueValidation('price', 0),
  controller.eventTicket.save
);
module.exports = router;
