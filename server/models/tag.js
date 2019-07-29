import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

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

export default model('Tag', tagSchema);
