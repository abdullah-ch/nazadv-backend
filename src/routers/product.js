const express = require('express');
const { productCreationUpdationRules, validate } = require('../validations');
const { createProduct, updateProduct } = require('../controllers/product');
const { verifyToken } = require('../middlewares/auth');

const productRouter = express.Router();

productRouter.post(
  '/',
  verifyToken,
  productCreationUpdationRules(),
  validate,
  createProduct
);

productRouter.put(
  '/',
  verifyToken,
  productCreationUpdationRules(),
  validate,
  updateProduct
);

module.exports = productRouter;
