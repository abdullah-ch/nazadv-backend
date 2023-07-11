const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let category = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the name of the category'],
      max: [50, 'name should be less than 50 characters'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide the slug of the category'],
      max: [50, 'slug should be less than 50 characters'],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = category;
