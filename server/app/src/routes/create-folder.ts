import Express from 'express';
import { userDetails } from '../models/userModel';
import UserService from '../services/userService';

const createRouter = Express.Router();

export { createRouter };