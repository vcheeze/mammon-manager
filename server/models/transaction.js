const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const transactionSchema = new Schema({
    amount: {
        type: Number,
        required: [true]
    },
    date: {
        type: Date,
        required: [true]
    },
    // TODO transform this into a list (one transaction may have multiple tags)
    tag: {
        type: ObjectId,
        ref: 'Tag'
    },
    comments: {
        type: String
    },
    account: {
        type: ObjectId,
        ref: 'Account'
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
