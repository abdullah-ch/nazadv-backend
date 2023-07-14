const { categoryModel } = require('../mongodb/model');

/**
 * Saves multiple categories to the database.
 * @param {Array<object>} categoriesPayload - The array of category data to be saved.
 * @returns {object} - The response from the database.
 */
const saveCategories = async (categoriesPayload) => {
  const response = await categoryModel.insertMany(categoriesPayload);
  return response;
};

/**
 * Removes all categories from the database.
 * @returns {object} - The response from the database.
 */
const removeCategories = async () => {
  const response = await categoryModel.deleteMany();
  return response;
};

/**
 * Retrieves a category from the database by its ID.
 * @param {string} id - The ID of the category to retrieve.
 * @returns {object} - The category.
 */
const getCategoryById = async (id) => {
  const response = await categoryModel.findById(id);
  return response;
};

/**
 * Retrieves all categories from the database.
 * @returns {Array<object>} - An array of categories.
 */
const getAllCategories = async () => {
  return await categoryModel.find();
};

module.exports = {
  saveCategories,
  removeCategories,
  getCategoryById,
  getAllCategories,
};
