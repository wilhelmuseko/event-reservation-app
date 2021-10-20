const errorCodes = {
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Resource not found',
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error. Detail: ',
  },
};

class BaseError extends Error {
  constructor(error, status) {
    super(error.message);
    this.statusCode = status || 500;
    this.errorCode = error.code;
  }
}

class InternalServerError extends BaseError {
  constructor(message) {
    const error = errorCodes.INTERNAL_SERVER_ERROR;
    error.message += message;
    super(error, 500);
  }
}

class NotFoundError extends BaseError {
  constructor() {
    super(errorCodes.NOT_FOUND, 404);
  }
}

module.exports = {
  InternalServerError,
  NotFoundError,
};
