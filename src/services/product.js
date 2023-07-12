const { productModel } = require('../mongodb/model');

const saveProduct = async (payload) => {
  const product = await new productModel(payload).save();
  return product;
};

const getProductByProperties = async (properties) => {
  const products = await productModel.find(properties);
  return products;
};

const getProductsByPropertiesExcludingId = async (id, properties) => {
  const products = await productModel.find({ _id: { $ne: id }, ...properties });
  return products;
};

const updateProductById = async (productId, updateData) => {
  const updatedProduct = await productModel.findByIdAndUpdate(
    productId,
    updateData,
    { new: true }
  );
  return updatedProduct;
};

const getAllProducts = async (userId) => {
  const products = await productModel
    .find({ userId })
    .populate('categoryId')
    .lean();
  return products;
};

const getProductDetailsById = async (productId) => {
  const product = await productModel
    .findOne({ _id: productId })
    .populate('categoryId')
    .lean();

  return product;
};
module.exports = {
  saveProduct,
  getProductByProperties,
  getProductsByPropertiesExcludingId,
  updateProductById,
  getAllProducts,
  getProductDetailsById,
};
