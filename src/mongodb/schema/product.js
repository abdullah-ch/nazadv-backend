const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the product'],
      max: [50, 'name should be less than 50 characters'],
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: [true, 'Please provide the category for the product'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide the price of the product'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Please provide the description of the product'],
      max: [1000, 'description should be less than 1000 characters'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Please provide the user for the product'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = product;
