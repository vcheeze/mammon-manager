/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required!'],
    unique: true
  }
});

tagSchema.statics.findByName = function(name) {
  return this.findOne({ name: new RegExp(name, 'i') });
};

tagSchema.statics.deleteByName = function(name) {
  return this.findOneAndDelete({ name: new RegExp(name, 'i') });
};

module.exports = mongoose.model('Tag', tagSchema);
