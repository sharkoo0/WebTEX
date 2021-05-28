import Express from 'express';
import { User } from '../models/userModel';
import UserService from '../services/userService';
import UserSchema from '../schemas/userSchema';
import mongoose from 'mongoose';

const logout = async (req: Express.Request, res: Express.Response) => {
  res.clearCookie('sessionId');
  res.json({ logout: true });
};

const login = async (req: Express.Request, res: Express.Response) => {
  const body: User = req.body;
  console.log(req.body);
  if (body) {
    UserService.login(body.email, body.password)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.sendStatus(401);
        console.log(error);
      });
  }
};

const register = async (req: Express.Request, res: Express.Response) => {
  try {
    const newUser: User = req.body;
    const user = new UserSchema({
      _id: new mongoose.Types.ObjectId(),
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });
    const createdUser = await user.save();
    console.log(createdUser);
    res.status(200).send(createdUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({error: error});
  }
};

export { login, logout, register };
