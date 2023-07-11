const mongoose = require('mongoose');
require('dotenv').config();
const seedCategoriesToDB = require('./categoriesSeeder');
const { MONGO_URL } = process.env;

async function seedData() {
  // Connect to the MongoDB database
  await mongoose.connect(MONGO_URL);

  try {
    await seedCategoriesToDB();
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

seedData();
