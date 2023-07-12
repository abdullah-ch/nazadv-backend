const { getCategoryById } = require('../services/category');

const isCategoryValid = async (id) => {
  try {
    const category = await getCategoryById(id);
    return category;
  } catch (error) {
    return false;
  }
};

module.exports = {
  isCategoryValid,
};
