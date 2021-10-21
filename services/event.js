const repository = require('../repository/index');
const { InternalServerError } = require('../error_utils/custom_error');
const eventService = {};

eventService.getAll = async () => {
  try {
    return await repository.event.findAll({
      include: [repository.location, repository.eventTicket],
      attributes: ['id', 'name', 'start_date', 'end_date'],
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
    const newEvent = await repository.event.create({
      name: body.name,
      start_date: body.start_date,
      end_date: body.end_date,
      location_id: body.location_id,
    });
    return newEvent;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = eventService;
