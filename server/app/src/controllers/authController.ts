import Express, { json } from 'express';
import { User } from '../models/userModel';
import UserService from '../services/userService';
import UserSchema from '../schemas/userSchema';
import mongoose from 'mongoose';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const logout = async (req: Express.Request, res: Express.Response) => {
  res.json({ logout: true });
};

const login = async (req: Express.Request, res: Express.Response) => {
  const body: User = req.body;
  UserService.login(body.email, body.password)
    .then(async () => {
      const token = jwt.sign(
        {
          name: body.email,
        },
        'TOPSECRETCODE',
        {
          expiresIn: '10h',
        }
      );
      const files = await UserSchema.findOne({ email: body.email })
        .select('files')
        .exec();
      res.setHeader('Authorization', token);
      res.status(200).json({ token: token, files: files.files });
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
        console.error(err);
      });
      fs.mkdir('../../shared/' + newUser.username, (err) => {
        console.error(err);
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
      res.status(200).json(token);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

export { login, logout, register };
