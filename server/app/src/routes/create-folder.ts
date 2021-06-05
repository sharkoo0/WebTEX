import Express from 'express';
import { userDetails } from '../models/userModel';
import UserService from '../services/userService';

import { postMethod, getMethod } from '../controllers/folderController';

const createFolderRouter = Express.Router();

createFolderRouter.get('/', getMethod);
createFolderRouter.post('/', postMethod);

export { createFolderRouter };