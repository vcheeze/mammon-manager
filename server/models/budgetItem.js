/* eslint-disable func-names */
const mongoose = require('mongoose');
const Budget = require('./budget');
const Category = require('./category');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const budgetItemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Budget Item name is required!']
  },
  budget: {
    type: ObjectId,
    ref: 'Budget',
    required: true
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  },
  allotted: {
    type: Number,
    required: [true, 'Budget Item amount is required!']
  },
  actual: {
    type: Number,
    default: 0
  }
});

budgetItemSchema.index({ budget: 1, category: 1 }, { unique: true });

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

budgetItemSchema.statics.deleteByBudgetAndCategory = function(budget, category) {
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
}

module.exports = mongoose.model('BudgetItem', budgetItemSchema);
