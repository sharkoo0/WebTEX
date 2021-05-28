import Express from 'express';
import { User } from '../models/userModel';
import UserService from '../services/userService';
import {login, logout, register} from "../controllers/authController";
import UserSchema from '../schemas/userSchema';
const authRouter = Express.Router();

authRouter.post('/logout', logout); //localhost:3000/app/auth/logout
authRouter.post('/login', login); //localhost:3000/app/auth/login
authRouter.post('/register', register); //localhost:3000/app/auth/register

authRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  UserSchema.findById(id).exec().then(doc => {
    console.log(doc);
    res.status(200).json(doc);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err); 
  });
});

export { authRouter };
