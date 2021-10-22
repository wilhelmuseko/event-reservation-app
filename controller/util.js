const { validationResult } = require('express-validator');
const { ValidationError } = require('../error_utils/custom_error');

const checkValidationResult = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array()[0].msg);
  }
};

module.exports = checkValidationResult;
