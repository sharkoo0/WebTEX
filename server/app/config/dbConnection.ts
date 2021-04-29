import mongoose from 'mongoose';
import User from '../src/schemas/userSchema';

const connectDB = () => {
    return mongoose.connect(`${process.env.DATABASE_URL}`, { useUnifiedTopology: true , useNewUrlParser: true});
}

const models = { User };
export { connectDB };
export default models;