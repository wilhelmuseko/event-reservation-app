const repository = require('../repository/index');
const { InternalServerError } = require('../error_utils/custom_error');
const eventService = {};

eventService.getAll = async () => {
  try {
    return await repository.event.findAll({
      include: [repository.location, repository.eventTicket],
      attributes: ['id', 'name', 'start_date', 'end_date'],
      order: [['start_date', 'DESC']],
    });
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

eventService.getEventById = async (id) => {
  try {
    return await repository.event.findByPk(id);
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

eventService.save = async (body) => {
  try {
    const newEvent = await repository.event.create(body);

    const result = await repository.event.findByPk(newEvent.id, {
      include: [repository.location, repository.eventTicket],
    });
    return result;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = eventService;
