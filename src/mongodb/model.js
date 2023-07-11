//this file contains all the models
const mongoose = require('mongoose');
const userSchema = require('./schema/user');
const categorySchema = require('./schema/category');

const userModel = mongoose.model('users', userSchema);
const categoryModel = mongoose.model('categories', categorySchema);

module.exports = {
  userModel,
  categoryModel,
};
