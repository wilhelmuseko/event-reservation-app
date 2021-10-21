const { errorCodes } = require('./error_utils/custom_error');

exports.successResponse = (message, results, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
};

exports.errorResponse = (error) => {
  return {
    message: error.message,
    code: error.statusCode || 500,
    errorCode: error.errorCode || errorCodes.INTERNAL_SERVER_ERROR.code,
    error: true,
  };
};
