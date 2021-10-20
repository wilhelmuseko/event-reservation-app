const services = require('../services/index');
const locationController = {};

locationController.getAll = async (req, res, next) => {
  try {
    const data = await services.location.getAll();
    res.status(200).json({
      message: 'Location list',
      data,
    });
  } catch (error) {
    next(error);
  }
};

locationController.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await services.location.getLocationById(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

locationController.save = async (req, res, next) => {
  try {
    const newLocation = await services.location.save(req.body);
    return res.status(201).json(newLocation);
  } catch (error) {
    next(error);
  }
};

module.exports = locationController;
