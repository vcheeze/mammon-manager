const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const accountSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Account name is required!'],
    unique: true
  },
  bankName: String,
  accountType: {
    type: ObjectId,
    ref: 'AccountType'
  },
  initialAmount: {
    type: Number,
    required: true,
    default: 0
  },
  currentAmount: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Account', accountSchema);
