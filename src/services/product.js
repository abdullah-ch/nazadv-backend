const { productModel } = require('../mongodb/model');

/**
 * Saves a product to the database.
 * @param {object} payload - The product data to be saved.
 * @returns {object} - The saved product.
 */
const saveProduct = async (payload) => {
  const product = await new productModel(payload).save();
  return product;
};

/**
 * Retrieves products from the database based on specified properties.
 * @param {object} properties - The properties to filter the products by.
 * @returns {Array<object>} - An array of products matching the specified properties.
 */
const getProductByProperties = async (properties) => {
  const products = await productModel.find(properties);
  return products;
};

/**
 * Retrieves products from the database based on specified properties, excluding a specific ID.
 * @param {string} id - The ID to exclude from the search.
 * @param {object} properties - The properties to filter the products by.
 * @returns {Array<object>} - An array of products matching the specified properties, excluding the given ID.
 */
const getProductsByPropertiesExcludingId = async (id, properties) => {
  const products = await productModel.find({ _id: { $ne: id }, ...properties });
  return products;
};

/**
 * Updates a product in the database by its ID.
 * @param {string} productId - The ID of the product to update.
 * @param {object} updateData - The data to update the product with.
 * @returns {object} - The updated product.
 */
const updateProductById = async (productId, updateData) => {
  const updatedProduct = await productModel.findByIdAndUpdate(
    productId,
    updateData,
    { new: true }
  );
  return updatedProduct;
};

/**
 * Retrieves all products from the database for a specific user.
 * @param {string} userId - The ID of the user to retrieve products for.
 * @returns {Array<object>} - An array of products belonging to the specified user.
 */
const getAllProducts = async (userId) => {
  const products = await productModel
    .find({ userId })
    .populate('categoryId')
    .lean();
  return products;
};

/**
 * Retrieves product details from the database by its ID.
 * @param {string} productId - The ID of the product to retrieve details for.
 * @returns {object} - The product details.
 */
const getProductDetailsById = async (productId) => {
  const product = await productModel
    .findOne({ _id: productId })
    .populate('categoryId')
    .lean();

  return product;
};

/**
 * Deletes a product from the database by its ID.
 * @param {string} productId - The ID of the product to delete.
 * @returns {object} - The result of the deletion operation.
 */
const deleteProductById = async (productId) => {
  const deletedProduct = await productModel.deleteOne({
    _id: productId,
  });

  return deletedProduct;
};

module.exports = {
  saveProduct,
  getProductByProperties,
  getProductsByPropertiesExcludingId,
  updateProductById,
  getAllProducts,
  getProductDetailsById,
  deleteProductById,
};
