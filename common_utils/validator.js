const { body } = require('express-validator');
const { snakeCaseToTitleCase } = require('./converter');

const requiredValidation = (fieldName) =>
  body(fieldName)
    .exists({
      checkFalsy: true,
      checkNull: true,
    })
    .withMessage(`${snakeCaseToTitleCase(fieldName)} is required.`);

const dateTimeFormatValidation = (fieldName) =>
  requiredValidation(fieldName)
    .isISO8601()
    .withMessage(
      `${snakeCaseToTitleCase(fieldName)} format must be YYYY-MM-DD HH:MM:SS`
    )
    .isAfter(new Date().toISOString())
    .withMessage(
      `${snakeCaseToTitleCase(fieldName)} of event must be after now`
    );

const dateFormatValidation = (fieldName) =>
  requiredValidation(fieldName)
    .isISO8601()
    .withMessage(`${snakeCaseToTitleCase(fieldName)} format must be YYYY-MM-DD`)
    .isBefore(new Date().toISOString())
    .withMessage(
      `${snakeCaseToTitleCase(fieldName)} of event must be before now`
    );

const lengthValidation = (fieldName, min, max) =>
  body(fieldName)
    .if(body(fieldName).exists())
    .isLength({ max, min })
    .withMessage(
      `${snakeCaseToTitleCase(
        fieldName
      )} length must be between ${min} - ${max}`
    );

const maxLengthValidation = (fieldName, max) =>
  body(fieldName)
    .if(body(fieldName).exists())
    .isLength({ max })
    .withMessage(
      `${snakeCaseToTitleCase(fieldName)} length must be maximum ${max}`
    );

const minLengthValidation = (fieldName, min) =>
  body(fieldName)
    .if(body(fieldName).exists())
    .isLength({ min })
    .withMessage(
      `${snakeCaseToTitleCase(fieldName)} length must be minimum ${min}`
    );

const idExistsValidation = (fieldName, query) =>
  body(fieldName)
    .if(body(fieldName).exists())
    .custom((value, { req }) => {
      return query.then((data) => {
        const record = data.find((o) => o.id === value);
        if (!record) {
          return Promise.reject(
            `${snakeCaseToTitleCase(
              fieldName
            )} ${value} does not exist in database.`
          );
        }
      });
    });

const numberMinValueValidation = (fieldName, min) =>
  body(fieldName)
    .if(body(fieldName).exists())
    .isNumeric({ no_symbols: true })
    .withMessage(
      `${snakeCaseToTitleCase(fieldName)} must be positive numeric value.`
    )
    .isInt({ min })
    .withMessage(
      `${snakeCaseToTitleCase(fieldName)} must be greater or equal than ${min}.`
    );

module.exports = {
  requiredValidation,
  dateTimeFormatValidation,
  lengthValidation,
  idExistsValidation,
  maxLengthValidation,
  minLengthValidation,
  numberMinValueValidation,
  dateFormatValidation,
};
