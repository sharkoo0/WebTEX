import Express from 'express';
import { userDetails } from '../models/userModel';
import UserService from '../services/userService';

const postMethod = async (req: Express.Request, res: Express.Response) => {
  const body = req.body;
  if (body) {
    UserService.change(
      body.id,
      body.username,
      body.email,
      body.phone,
      body.altEmail,
      body.address,
      body.photo,
      body.newPassword,
      body.confNewPassword
    )
      .then(() => {
        res.sendStatus(200);
        return;
      })
      .catch((error) => {
        res.sendStatus(401);
      });
  }
};

const getMethod = async (req: Express.Request, res: Express.Response) => {
  res.send('save changes');
};

export { postMethod, getMethod };
