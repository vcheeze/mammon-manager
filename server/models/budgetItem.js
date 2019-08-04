/* eslint-disable func-names */
const mongoose = require('mongoose');
const Budget = require('./budget');
const Category = require('./category');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const budgetItemSchema = new Schema({
  budget: {
    type: ObjectId,
    ref: 'Budget',
    required: [true, 'Budget is required!']
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: [true, 'Category is required!']
  },
  allotted: {
    type: Number,
    required: [true, 'Allotted amount is required!']
  },
  actual: {
    type: Number,
    default: 0
  }
});

budgetItemSchema.index({ budget: 1, category: 1 }, { unique: true });

budgetItemSchema.pre('save', function() {
  this.budget.budgetItems.push(this);
});

budgetItemSchema.statics.findByBudgetAndCategory = function(budget, category) {
  let budgetId;
  let categoryId;
  Budget.findByName(budget).then(doc => {
    budgetId = doc.budget._id;
  });
  Category.findByName(category).then(doc => {
    categoryId = doc.category._id;
  });
  return this.findOne({
    $and: [{ budget: budgetId }, { category: categoryId }]
  });
};

budgetItemSchema.statics.deleteByBudgetAndCategory = function(
  budget,
  category
) {
  let budgetId;
  let categoryId;
  Budget.findByName(budget).then(doc => {
    budgetId = doc.budget._id;
  });
  Category.findByName(category).then(doc => {
    categoryId = doc.category._id;
  });
  return this.findOneAndDelete({
    $and: [{ budget: budgetId }, { category: categoryId }]
  });
};

budgetItemSchema.methods.updateActual = function(amount) {
  this.actual += amount;
  this.save(function(err, budgetItem) {
    if (err) throw err;
    console.log('Updated actual: ', budgetItem.actual);
  });
};

module.exports = {
  budgetItemSchema,
  budgetItem: mongoose.model('BudgetItem', budgetItemSchema)
};
// module.exports = mongoose.model('BudgetItem', budgetItemSchema);
