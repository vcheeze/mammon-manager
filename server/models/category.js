const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true]
    },
    tags: [{ type: ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Category', categorySchema);