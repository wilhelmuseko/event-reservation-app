const repository = require('../repository/index');
const { InternalServerError } = require('../error_utils/custom_error');
const locationService = {};

locationService.getAll = async () => {
  try {
    return await repository.location.findAll();
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

locationService.getLocationById = async (id) => {
  try {
    return await repository.location.findByPk(id);
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

locationService.save = async (body) => {
  try {
    const newLocation = await repository.location.create(body);
    return newLocation;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = locationService;
