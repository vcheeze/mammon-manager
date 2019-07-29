const mongoose = require('mongoose');

const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required!'],
    unique: true
  }
});

module.exports = mongoose.model('Tag', tagSchema);
