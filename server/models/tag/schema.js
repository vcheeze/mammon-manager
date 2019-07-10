const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    category: {
        type: ObjectId,
        required: [true]
    },
    createdAt: {
        type: Date,
        required: [true]
    }
});

module.exports = { categorySchema: tagSchema };