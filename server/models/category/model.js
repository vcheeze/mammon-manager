const mongoose = require('mongoose');
const { categorySchema } = require('./schema');

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category };