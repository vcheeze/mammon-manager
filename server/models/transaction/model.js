const mongoose = require('mongoose');
const { transactionSchema } = require('./schema');

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Transaction };