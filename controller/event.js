const services = require('../services/index');
const eventController = {};

eventController.getAll = async (req, res, next) => {
  try {
    const data = await services.event.getAll();
    res.status(200).json({
      message: 'Event list',
      data,
    });
  } catch (error) {
    next(error);
  }
};

eventController.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await services.location.getLocationById(id);
    res.status(200).json({
      message: 'Event data',
      data,
    });
  } catch (error) {
    next(error);
  }
};

// locationController.save = async (req, res, next) => {
//   try {
//     const newLocation = await services.location.save(req.body);
//     return res.status(201).json(newLocation);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = eventController;
