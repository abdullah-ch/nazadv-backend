//this file contains all the models
const mongoose = require('mongoose');
const userSchema = require('./schema/user');
const categorySchema = require('./schema/category');
const productSchema = require('./schema/product');

const userModel = mongoose.model('users', userSchema);
const categoryModel = mongoose.model('categories', categorySchema);
const productModel = mongoose.model('products', productSchema);

module.exports = {
  userModel,
  categoryModel,
  productModel,
};
