const repository = require('../repository/index');
const { InternalServerError } = require('../error_utils/custom_error');
const eventTicketService = {};

eventTicketService.save = async (body) => {
  try {
    const { event_id, type, quota, price } = body;
    const newEventTicket = await repository.eventTicket.create({
      event_id,
      type,
      quota,
      price,
    });
    return newEventTicket;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = eventTicketService;
