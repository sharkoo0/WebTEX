import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  destination: {
    type: String,
  },
  path: {
    type: String,
  },
  size: {
    type: Number,
  },
  owner: {
    type: String,
  },
});

const File = mongoose.model('File', fileSchema);

export default File;
