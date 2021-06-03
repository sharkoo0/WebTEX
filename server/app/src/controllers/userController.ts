import Express from 'express';
import { userDetails } from '../models/userModel';
import UserService from '../services/userService';

const postMethod = async (req: Express.Request, res: Express.Response) => {
  const body: userDetails = req.body;
  console.log(req.body);
  if (body) {
    await UserService.change(body.id,body.email, body.phone,body.altEmail, body.address, body.photo,body.newPassword,body.confNewPassword).then(() => {
      res.sendStatus(200);
    }).catch(error => {
      // res.redirect('/');
      res.sendStatus(401);
      console.log(error);
    })
  }
};

const getMethod = async(req: Express.Request, res: Express.Response) => {
  res.send('save changes');
};

export { postMethod, getMethod };