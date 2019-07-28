const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required!'],
        unique: true
    },
    category: {
        type: ObjectId,
        ref: 'Category'
        // TODO add required field if necessary
    }
});

module.exports = mongoose.model('Tag', tagSchema);
