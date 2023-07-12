const express = require('express');
const {
  productCreationUpdationRules,
  validate,
  productIdRules,
} = require('../validations');
const {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
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
productRouter.get(
  '/:id',
  verifyToken,
  productIdRules(),
  validate,
  getProductById
);

productRouter.put(
  '/',
  verifyToken,
  productCreationUpdationRules(),
  validate,
  updateProduct
);

productRouter.delete(
  '/:id',
  verifyToken,
  productIdRules(),
  validate,
  deleteProduct
);

module.exports = productRouter;
