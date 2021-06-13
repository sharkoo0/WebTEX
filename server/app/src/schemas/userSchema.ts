import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    transform: true,
    trim: true,
    minLength: 6,
    maxLength: 25,
  },
  password: {
    type: String,
    required: true,
    transform: true,
    trim: true,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
  },
  email: {
    type: String,
    required: true,
    transform: true,
    trim: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  firstName: {
    type: String,
    required: true,
    transform: true,
    trim: true,
    maxLength: 25,
  },
  lastName: {
    type: String,
    required: true,
    transform: true,
    trim: true,
    maxLengt: 25,
  },
  photoPath: {
    type: String,
  },
  altEmail: {
    type: String,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  birthdate: {
    type: String,
  },
  phone: {
    type: String,
  },
  files: [
    {
      name: String,
      path: String,
      size: Number,
      mimetype: String,
    },
  ],
  sharedFiles: [
    {
      name: String,
      path: String,
      size: Number,
      mimetype: String,
      owner: String,
    },
  ],
});

const UserSchema = mongoose.model('User', userSchema);
export default UserSchema;
