const { productModel } = require('../mongodb/model');

const saveProduct = async (payload) => {
  const product = await new productModel(payload).save();
  return product;
};

const getProductByProperties = async (properties) => {
  const products = await productModel.find(properties);
  return products;
};

module.exports = {
  saveProduct,
  getProductByProperties,
};
