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

budgetSchema.statics.findActive = function() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return this.findOne({ period: { $gte: firstDay, $lte: lastDay } });
};

budgetSchema.methods.resetAllotted = function(callback) {
  this.budgetItems.forEach(bi => {
    bi.allotted = 0;
  });
  this.save(callback);
};

budgetSchema.methods.resetActual = function(callback) {
  this.budgetItems.forEach(bi => {
    bi.actual = 0;
  });
  this.save(callback);
};

module.exports = mongoose.model('Budget', budgetSchema);
