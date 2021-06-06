import Express from 'express';
import { shareFolder, shareFile } from '../controllers/shareController';

const shareRouter = Express.Router();

shareRouter.post('/folder', shareFolder);
shareRouter.post('/file', shareFile);

export {shareRouter};