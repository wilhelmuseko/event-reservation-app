const repository = require('../repository/index');
const { InternalServerError } = require('../error_utils/custom_error');
const eventService = {};

eventService.getAll = async () => {
  try {
    return await repository.event.findAll();
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

// eventService.save = async (body) => {
//   try {
//     const newLocation = await repository.location.create({
//       name: body.name,
//       address: body.address,
//     });
//     return newLocation;
//   } catch (error) {
//     throw new InternalServerError(error.message);
//   }
// };

module.exports = eventService;
