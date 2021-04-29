import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String
        }, 
        password: {
            type: String
        },
        email: {
            type: String
        },
        fisrtName: {
            type: String
        },
        lastName: {
            type: String
        }
    }
);

const User = mongoose.model('User', userSchema);    

export default User;