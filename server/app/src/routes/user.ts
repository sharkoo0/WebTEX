import Express from 'express';
import { User } from '../models/userModel';
import UserService from '../services/userService';

const userRouter = Express.Router();

userRouter.get('/', (req, res) => {
    res.json(UserService.users);
});

userRouter.post('/', async(req, res) => {
    try{ 
        const newUser: User = req.body;
        if(newUser) {
            const user = await UserService.addUser(newUser);
            res.json(user);
        } else {
            res.sendStatus(400);
        }
    } catch(error) {
        res.sendStatus(400);
    }
});



export {userRouter};


