const { body, validationResult } = require('express-validator');
const { UN_PROCESSABLE } = require('../constants/errorCodes');
const AppError = require('../utils/error');

const userSignUpRules = () => {
  return [
    body('email').isEmail().withMessage('Invalid Email Format'),
    body('password')
      .not()
      .isEmpty()
      .bail()
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 chars long'),
    body('name').isString().not().isEmpty().withMessage('Name cannot be empty'),
    body('joiningDate')
      .not()
      .isEmpty()
      .withMessage('Joining Date cannot be empty')
      .bail()
      .custom((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      })
      .withMessage('Joining Date is not a valid date'),
  ];
};

const userLogInRules = () => {
  return [
    body('email').isEmail().withMessage('Invalid Email Format'),
    body('password')
      .not()
      .isEmpty()
      .bail()
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 chars long'),
  ];
};

const productCreationUpdationRules = () => {
  return [
    body('name')
      .isString()
      .not()
      .isEmpty()
      .withMessage('Product name cannot be empty'),
    body('description')
      .isString()
      .not()
      .isEmpty()
      .withMessage('Product description cannot be empty')
      .isLength({ max: 1000 })
      .withMessage('password must be at least 1000 chars long'),
    body('price')
      .isNumeric()
      .withMessage('Price is not a number')
      .not()
      .isEmpty()
      .withMessage('Product Price cannot be empty'),
    body('categoryId')
      .isString()
      .not()
      .isEmpty()
      .withMessage('Category Id cannot be empty'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().forEach((error) => {
    const key = error.param;
    const message = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    extractedErrors.push({ key, message });
  });

  next(new AppError(extractedErrors, UN_PROCESSABLE));
};

module.exports = {
  userSignUpRules,
  userLogInRules,
  productCreationUpdationRules,
  validate,
};
