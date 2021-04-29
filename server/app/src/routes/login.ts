import Express from 'express';
import { User } from '../models/userModel';
import UserService from '../services/userService';

const loginRouter = Express.Router();

loginRouter.get('/', (req, res) => {
  res.send('login page');
});

loginRouter.post('/', (req, res) => {
  const body: User = req.body;
  if (body) {
    UserService.login(body.email, body.password).then(() => {
      res.sendStatus(200);
    }).catch(error => {
      // res.redirect('/');
      res.sendStatus(401);
      console.log(error);
    })
    // if(UserService.login(body.email, body.password)) {
    //   res.sendStatus(200);
    //   console.log("200");
    // } else {
    //   res.sendStatus(401);
    //   res.redirect('/');
    //   console.log("401");
    // }
    
  }
});

export { loginRouter };
