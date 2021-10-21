const { successResponse } = require('../response_api');
const services = require('../services/index');
const eventTicketController = {};

eventTicketController.save = async (req, res, next) => {
  try {
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
