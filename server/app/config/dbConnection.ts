import mongoose from 'mongoose';
import User from '../src/schemas/userSchema';
import File from '../src/schemas/fileSchema';

const connectDB = () => {
    return mongoose.connect(`${process.env.DATABASE_URL}`, { useUnifiedTopology: true , useNewUrlParser: true});
}

const models = { User, File };
export { connectDB };
export default models;