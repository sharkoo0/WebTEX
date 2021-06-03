import Express from 'express';
import { postMethod, getMethod } from '../controllers/userController';

const saveRouter = Express.Router();

saveRouter.get('/', getMethod);
saveRouter.put('/', postMethod);

export { saveRouter };
