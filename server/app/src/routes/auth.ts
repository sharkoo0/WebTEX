import Express from 'express';
import { User } from '../models/userModel';
import UserService from '../services/userService';

const authRouter = Express.Router();

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
    if (newUser) {
      const user = await UserService.addUser(newUser);
      res.json(user);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(400);
  }
};

authRouter.post('/logout', logout);
authRouter.post('/login', login);
authRouter.post('/register', register);

export { authRouter };
