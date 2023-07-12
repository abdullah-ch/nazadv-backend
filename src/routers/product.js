const express = require('express');
const { productCreationRules, validate } = require('../validations');
const { createProduct } = require('../controllers/product');
const { verifyToken } = require('../middlewares/auth');

const productRouter = express.Router();

productRouter.post(
  '/',
  verifyToken,
  productCreationRules(),
  validate,
  createProduct
);

module.exports = productRouter;
