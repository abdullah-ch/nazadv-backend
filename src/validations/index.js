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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ message: err.msg }));

  next(new AppError(extractedErrors, UN_PROCESSABLE));
};

module.exports = {
  userSignUpRules,
  userLogInRules,
  validate,
};
