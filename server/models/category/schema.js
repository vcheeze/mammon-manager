const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    createdAt: {
        type: Date,
        required: [true]
    }
});

module.exports = { categorySchema };