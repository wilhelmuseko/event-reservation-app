const express = require('express');
const {
  lengthValidation,
  requiredValidation,
  maxLengthValidation,
  dateFormatValidation,
  idExistsValidation,
  numberMinValueValidation,
} = require('../common_utils/validator');
const router = express.Router();
const controller = require('../controller/index');
const { body } = require('express-validator');
const service = require('../services/index');

router.post(
  '/create',
  requiredValidation('customer.first_name'),
  requiredValidation('customer.date_of_birth'),
  requiredValidation('customer.phone_number'),
  requiredValidation('customer.street_address'),
  requiredValidation('customer.city'),
  requiredValidation('customer.state'),
  lengthValidation('customer.street_address', 1, 250),
  lengthValidation('customer.city', 1, 50),
  lengthValidation('customer.state', 1, 50),
  maxLengthValidation('customer.unit_no', 20),
  maxLengthValidation('customer.postal_code', 16),
  lengthValidation('customer.first_name', 1, 250),
  lengthValidation('customer.phone_number', 4, 15),
  maxLengthValidation('customer.last_name', 250),
  dateFormatValidation('customer.date_of_birth'),
  requiredValidation('event'),
  requiredValidation('event.id'),
  idExistsValidation('event.id', service.event.getAll()),
  requiredValidation('event.tickets')
    .notEmpty()
    .withMessage('Tickets must not be empty.'),
  numberMinValueValidation('event.tickets.*.quantity', 1),
  body('event.id')
    .if(body('event.id').exists())
    .custom(async (value, { req }) => {
      const eventTicket = await service.eventTicket.findOneWithCondition({
        event_id: value,
      });
      if (!eventTicket) {
        return Promise.reject('Event chosen must have ticket first.');
      }
    }),
  body('event.id')
    .if(body('event.id').exists())
    .custom(async (value, { req }) => {
      const event = await service.event.getEventById(value);
      if (!event) return true;
      if (new Date(event.end_date) < new Date()) {
        return Promise.reject(
          'Event period has been ended. Cannot book this event anymore'
        );
      }
    }),
  body('event.tickets.*.id').custom(async (value, { req }) => {
    const ticket = await service.eventTicket.getById(value);
    const eventId = req.body.event.id;
    if (ticket.event_id !== eventId) {
      return Promise.reject(
        'This ticket is not belong to the selected event. Please re-check the input.'
      );
    }
    return true;
  }),
  body('event.tickets').custom(async (value, { req }) => {
    for (var ticket of value) {
      const eventTicketData = await service.eventTicket.getById(ticket.id);
      const total =
        await service.transaction.getTotalQuantityPurchaseByEventTicketId(
          ticket.id
        );

      if (total + ticket.quantity > eventTicketData.quota) {
        return Promise.reject(
          `Ticket quota for ${
            eventTicketData.type
          } has been exceeded. Only ${Math.max(
            eventTicketData.quota - total,
            0
          )} ticket(s) left.`
        );
      }
    }
    return true;
  }),
  controller.transaction.save
);
router.get('/get_info', controller.transaction.getAll);
module.exports = router;
