const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const budgetSchema = new Schema({

});

module.exports = mongoose.model('Budget', budgetSchema);