const express = require('express');
const { productCreationUpdationRules, validate } = require('../validations');
const {
  createProduct,
  updateProduct,
  getProducts,
  getProductById,
} = require('../controllers/product');
const { verifyToken } = require('../middlewares/auth');

const productRouter = express.Router();

productRouter.post(
  '/',
  verifyToken,
  productCreationUpdationRules(),
  validate,
  createProduct
);

productRouter.get('/', verifyToken, getProducts);
productRouter.get('/:id', verifyToken, getProductById);

productRouter.put(
  '/',
  verifyToken,
  productCreationUpdationRules(),
  validate,
  updateProduct
);

module.exports = productRouter;
