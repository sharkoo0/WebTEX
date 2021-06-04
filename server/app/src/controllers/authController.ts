import Express, { json } from 'express';
import { User } from '../models/userModel';
import UserService from '../services/userService';
import UserSchema from '../schemas/userSchema';
import mongoose from 'mongoose';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const logout = async (req: Express.Request, res: Express.Response) => {
  res.clearCookie('sessionId');
  res.json({ logout: true });
};

const login = async (req: Express.Request, res: Express.Response) => {
  const body: User = req.body;
  console.log('login' + body);

  UserService.login(body.email, body.password)
    .then(() => {
      console.log('Zdrasti, az sam vashta lelq');
      
      const token = jwt.sign({
        name: body.email,
      }, 'TOPSECRETCODE', {
        expiresIn: '10h'
      });
      res.setHeader('Authorization', token)
      res.status(200).json({ message: 'Zdrasti, az sam vashta lelq' });
      res.redirect('/');
    })
    .catch((error) => {
      res.status(401).json({"error": error});
    });
};

const register = async (req: Express.Request, res: Express.Response) => {
  const newUser: User = req.body;
  console.log(req.body);
  console.log(newUser);
  // const user = new UserSchema({
  //   _id: new mongoose.Types.ObjectId(),
  //   username: newUser.username,
  //   password: newUser.password,
  //   email: newUser.email,
  //   firstName: newUser.firstName,
  //   lastName: newUser.lastName,
  // });
  // const createdUser = await UserService.addUser(newUser);
  // console.log(createdUser);
  UserService.addUser(newUser)
    .then(() => {
      fs.mkdir('../../info/' + newUser.username, (err) => {
        console.log(err);
      });
      res.status(200).json(newUser);
      res.redirect('/');
    })
    .catch((err) => { 
      res.status(400).json({ "error": err });
    });
};

export { login, logout, register };
