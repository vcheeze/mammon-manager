const mongoose = require('mongoose');
const { categorySchema } = require('./schema');

const Tag = mongoose.model('Tag', categorySchema);

module.exports = { Tag };