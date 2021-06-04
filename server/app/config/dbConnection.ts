import mongoose from 'mongoose';
import User from '../src/schemas/userSchema';
import File from '../src/schemas/fileSchema';
import Folder from '../src/schemas/folderSchema';


const connectDB = () => {
    return mongoose.connect(`${process.env.DATABASE_URL}`, { useUnifiedTopology: true , useNewUrlParser: true});
}

const models = { User, File, Folder };
export { connectDB };
export default models;