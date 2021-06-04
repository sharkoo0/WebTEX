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
  await UserService.login(body.email, body.password)
    .then(() => {
      const token = jwt.sign(
        {
          name: body.email,
        },
        'TOPSECRETCODE',
        {
          expiresIn: '10h',
        }
      );
      console.log(token);
      res.setHeader('Authorization', token);
      // res.status(200).json(body);
      res.status(200).json({"token: ":token})
      // res.render('../client/html/myFiles.html', {msg: 'Express'})
    })
    .catch((error) => {
      res.status(401).json({ error: error });
    });
};

const register = async (req: Express.Request, res: Express.Response) => {
  const newUser: User = req.body;
  await UserService.addUser(newUser)
    .then(() => {
      fs.mkdir('../../info/' + newUser.username, (err) => {
        console.log(err);
      });
      const token = jwt.sign(
        {
          name: newUser.email,
        },
        'TOPSECRETCODE',
        {
          expiresIn: '10h',
        }
      );
      res.setHeader('Authorization', token);
      res.status(200).json(newUser);
      // res.redirect(200, '/');
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

export { login, logout, register };
