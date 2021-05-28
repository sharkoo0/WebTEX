import Express from 'express';
import { userDetails } from '../models/userModel';
import UserService from '../services/userService';

const saveRouter = Express.Router();

saveRouter.get('/', (req, res) => {
  res.send('save changes');
});

saveRouter.put('/', (req, res) => {
  const body: userDetails = req.body;
  console.log(req.body);
  if (body) {
    UserService.change(body.id,body.email, body.phone,body.altEmail, body.address, body.photo,body.newPassword,body.confNewPassword).then(() => {
      res.sendStatus(200);
    }).catch(error => {
      // res.redirect('/');
      res.sendStatus(401);
      console.log(error);
    })
  }

});

export { saveRouter };
