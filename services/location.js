const model = require('../repository/index');
const locationService = {};

locationService.getAll = async () => {
  try {
    return await model.location.findAll();
  } catch (error) {
    throw error;
  }
};

module.exports = locationService;
