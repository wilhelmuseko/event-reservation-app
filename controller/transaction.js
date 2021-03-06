const services = require('../services/index');
const { successResponse } = require('../response_api');
const checkValidationResult = require('./util');
const transactionController = {};

transactionController.getAll = async (req, res, next) => {
  try {
    const data = await services.transaction.getAll();
    res.json(successResponse('Purchase list', { data: data }, 200));
  } catch (error) {
    next(error);
  }
};

transactionController.save = async (req, res, next) => {
  try {
    checkValidationResult(req);
    const newPurchase = await services.transaction.save(req.body);
    res
      .status(201)
      .json(
        successResponse(
          'Ticket purchase saved to database.',
          { data: newPurchase },
          201
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = transactionController;
