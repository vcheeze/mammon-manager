const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const budgetSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Budget name is required!']
    },
    budgetItems: [{ type: ObjectId, ref: 'BudgetItem' }]
});

module.exports = mongoose.model('Budget', budgetSchema);