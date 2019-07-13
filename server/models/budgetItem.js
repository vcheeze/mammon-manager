const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const budgetItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Budget Item name is required!']
    },
    budget: {
        type: ObjectId,
        ref: 'Budget'
    },
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    amount: {
        type: Number,
        required: [true, 'Budget Item amount is required!']
    }
});

module.exports = mongoose.model('BudgetItem', budgetItemSchema);