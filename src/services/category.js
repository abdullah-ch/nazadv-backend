const { categoryModel } = require('../mongodb/model');

const saveCategories = async (categoriesPayload) => {
  const response = await categoryModel.insertMany(categoriesPayload);
  return response;
};

const removeCategories = async () => {
  const response = await categoryModel.deleteMany();
  return response;
};

const getCategoryById = async (id) => {
  const response = await categoryModel.findById(id);
  return response;
};

const getAllCategories = async () => {
  return await categoryModel.find();
};

module.exports = {
  saveCategories,
  removeCategories,
  getCategoryById,
  getAllCategories,
};
