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
    tag: {
        type: ObjectId,
        ref: 'Tag'
    },
    comments: {
        type: String
    },
    createdAt: {
        type: Date,
        required: [true]
    }
});

module.exports = { transactionSchema };