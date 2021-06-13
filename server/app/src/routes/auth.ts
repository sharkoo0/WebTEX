import Express from 'express';
import { User } from '../models/userModel';
import UserService from '../services/userService';
import { login, logout, register } from '../controllers/authController';
import UserSchema from '../schemas/userSchema';
const authRouter = Express.Router();

authRouter.post('/logout', logout);
authRouter.post('/login', login);
authRouter.post('/register', register);

export { authRouter };
