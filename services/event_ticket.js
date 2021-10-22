const repository = require('../repository/index');
const { InternalServerError } = require('../error_utils/custom_error');
const eventTicketService = {};

eventTicketService.findOneWithCondition = async (condition) => {
  try {
    const data = await repository.eventTicket.findOne({
      where: condition,
    });
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

eventTicketService.getById = async (id) => {
  try {
    const data = await repository.eventTicket.findByPk(id);
    return data;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

eventTicketService.save = async (body) => {
  try {
    let result = [];
    for (var ticket of body) {
      const newEventTicket = await repository.eventTicket.create(ticket);
      const eventTicket = await repository.eventTicket.findByPk(
        newEventTicket.id,
        {
          include: repository.event,
        }
      );
      result.push(eventTicket);
    }

    return result;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = eventTicketService;
