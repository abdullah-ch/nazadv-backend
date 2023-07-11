const { categoryModel } = require('../mongodb/model');

const saveCategories = async (categoriesPayload) => {
  const response = await categoryModel.insertMany(categoriesPayload);
  return response;
};

const removeCategories = async () => {
  const response = await categoryModel.deleteMany();
  return response;
};

module.exports = {
  saveCategories,
  removeCategories,
};
