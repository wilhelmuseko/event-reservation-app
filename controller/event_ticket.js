const { successResponse } = require('../response_api');
const services = require('../services/index');
const { validationResult } = require('express-validator');
const { ValidationError } = require('../error_utils/custom_error');
const eventTicketController = {};

eventTicketController.save = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array()[0].msg);
    }
    const newEventTicket = await services.eventTicket.save(req.body);
    res
      .status(201)
      .json(
        successResponse(
          'Event ticket saved to database.',
          { data: newEventTicket },
          201
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = eventTicketController;
