const { saveCategories, removeCategories } = require('../services/category');

const categoriesPayload = [
  { name: 'Anime', slug: 'anime' },
  { name: 'Music', slug: 'music' },
  { name: 'Food', slug: 'food' },
  { name: 'Cars', slug: 'car' },
  { name: 'Utensils', slug: 'utensil' },
  { name: 'Movies', slug: 'movie' },
];

const seedCategoriesToDB = async () => {
  try {
    await removeCategories();
    const response = await saveCategories(categoriesPayload);
    console.log(response);
  } catch (error) {
    console.log('error ---<> ', error);
  }
};

module.exports = seedCategoriesToDB;
