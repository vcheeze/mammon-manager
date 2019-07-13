const mongoose = required('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const accountTypeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Account Type name is required!']
    },
    accounts: [{ type: ObjectId, ref: 'Account' }]
});

module.exports = mongoose.model('AccountType', accountTypeSchema);