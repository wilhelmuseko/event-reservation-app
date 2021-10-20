const models = require('../repository/index');
const { InternalServerError } = require('../error-utils/custom-error');
const locationService = {};

locationService.getAll = async () => {
  try {
    return await models.location.findAll();
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

locationService.getLocationById = async (id) => {
  try {
    return await models.location.findByPk(id);
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

locationService.save = async (body) => {
  try {
    const newLocation = await models.location.create({
      name: body.name,
      address: body.address,
    });
    return newLocation;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = locationService;
