/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required!'],
    unique: true
  }
});

categorySchema.statics.findByName = function(name) {
  return this.findOne({ name: new RegExp(name, 'i') });
};

categorySchema.statics.deleteByName = function(name) {
  return this.findOneAndDelete({ name: new RegExp(name, 'i') });
};

module.exports = mongoose.model('Category', categorySchema);
