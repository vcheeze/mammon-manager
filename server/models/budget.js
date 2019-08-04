/* eslint-disable func-names */
const mongoose = require('mongoose');
const { budgetItemSchema: BudgetItemSchema } = require('./budgetItem');

const { Schema } = mongoose;
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const budgetSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Budget name is required!']
  },
  period: {
    type: Date,
    required: [true, 'Please select a month!']
  },
  budgetItems: [BudgetItemSchema]
});

budgetSchema.virtual('periodName').get(function() {
  const period = new Date(this.period);
  return `${monthNames[period.getMonth()]} ${period.getFullYear()}`;
});

budgetSchema.set('toJSON', { virtuals: true });

budgetSchema.statics.findByName = function(name) {
  return this.findOne({ name: new RegExp(name, 'i') });
};

budgetSchema.statics.deleteByName = function(name) {
  return this.findOneAndDelete({ name: new RegExp(name, 'i') });
};

module.exports = mongoose.model('Budget', budgetSchema);
