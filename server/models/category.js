import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true],
    unique: true
  },
  tags: [{ type: ObjectId, ref: 'Tag' }]
});

export default model('Category', categorySchema);
