const { successResponse } = require('../response_api');
const services = require('../services/index');
const { validationResult } = require('express-validator');
const { ValidationError } = require('../error_utils/custom_error');
const eventController = {};

eventController.getAll = async (req, res, next) => {
  try {
    const data = await services.event.getAll();
    res.json(successResponse('Event list', { data: data }, 200));
  } catch (error) {
    next(error);
  }
};

eventController.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await services.location.getLocationById(id);
    res.json(successResponse('Event Data', { data: data }, 200));
  } catch (error) {
    next(error);
  }
};

eventController.save = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array()[0].msg);
    }
    const newEvent = await services.event.save(req.body);
    res
      .status(201)
      .json(
        successResponse('Event saved to database.', { data: newEvent }, 201)
      );
  } catch (error) {
    next(error);
  }
};

module.exports = eventController;
