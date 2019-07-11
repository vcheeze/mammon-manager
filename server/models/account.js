const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const accountSchema = new Schema({

});

module.exports = mongoose.model('Account', accountSchema);