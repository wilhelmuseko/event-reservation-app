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
const repository = require('../repository/index');
const { body } = require('express-validator');
const { Sequelize } = require('sequelize');

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
  idExistsValidation('event.id', repository.event),
  requiredValidation('event.tickets')
    .notEmpty()
    .withMessage('Tickets must not be empty.'),
  numberMinValueValidation('event.tickets.*.quantity', 1),
  body('event.id')
    .if(body('event.id').exists())
    .custom((value, { req }) => {
      return repository.eventTicket
        .findOne({
          where: {
            event_id: value,
          },
        })
        .then((record) => {
          if (!record) {
            return Promise.reject('Event chosen must have ticket first.');
          }
        });
    }),
  body('event.id')
    .if(body('event.id').exists())
    .custom(async (value, { req }) => {
      const event = await repository.event.findByPk(value);
      if (!event) return true;
      if (new Date(event.end_date) < new Date()) {
        return Promise.reject(
          'Event period has been ended. Cannot book this event anymore'
        );
      }
    }),
  body('event.tickets').custom(async (value, { req }) => {
    for (var ticket of value) {
      const eventTicketData = await repository.eventTicket.findByPk(ticket.id);
      const total =
        (await repository.ticketPurchaseDetail.sum('quantity', {
          where: {
            event_ticket_id: ticket.id,
          },
        })) || 0;

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
