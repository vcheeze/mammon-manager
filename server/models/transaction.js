/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const transactionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required for Transactions!']
  },
  description: String,
  budgetItem: {
    type: ObjectId,
    ref: 'BudgetItem',
    required: [true, 'BudgetItem is required for Transactions!']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required for Transactions!']
  },
  date: {
    type: Date,
    required: [true, 'Date is required for Transactions!']
  },
  tags: [{ type: ObjectId, ref: 'Tag' }],
  account: {
    type: ObjectId,
    ref: 'Account'
  }
});

transactionSchema.statics.findByName = function(name) {
  return this.findOne({ name: new RegExp(name, 'i') });
};

transactionSchema.statics.deleteByName = function(name) {
  return this.findOneAndDelete({ name: new RegExp(name, 'i') });
};

module.exports = mongoose.model('Transaction', transactionSchema);
