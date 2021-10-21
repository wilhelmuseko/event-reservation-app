const services = require('../services/index');
const { successResponse } = require('../response_api');
const { validationResult } = require('express-validator');
const { ValidationError } = require('../error_utils/custom_error');
const locationController = {};

locationController.getAll = async (req, res, next) => {
  try {
    const data = await services.location.getAll();
    res.json(successResponse('Location list', { data: data }, 200));
  } catch (error) {
    next(error);
  }
};

locationController.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await services.location.getLocationById(id);
    res.json(successResponse('Location data', { data: data }, 200));
  } catch (error) {
    next(error);
  }
};

locationController.save = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array()[0].msg);
    }
    const newLocation = await services.location.save(req.body);
    res
      .status(201)
      .json(
        successResponse(
          'Location data saved to database.',
          { data: newLocation },
          201
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = locationController;
