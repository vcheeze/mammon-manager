const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required!']
    },
    category: {
        type: ObjectId
        // TODO add required field if necessary
    }
});

module.exports = mongoose.model('Tag', tagSchema);