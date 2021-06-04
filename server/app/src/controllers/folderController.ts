import Express from 'express';
import { Folder } from '../models/folderModel';
import FolderSchema from '../schemas/folderSchema';
import FolderService from '../services/folderService';

const postMethod = async (req: Express.Request, res: Express.Response) => {
  const newFolder: Folder = req.body;
  console.log(req.body);
  if (newFolder) {
    await FolderService.addFolder(newFolder.name).then(() => {
      res.json(newFolder);
      res.sendStatus(200);
    }).catch(error => {
      // res.redirect('/');
      res.sendStatus(401);
      console.log(error);
    })
  }
};

const getMethod = async(req: Express.Request, res: Express.Response) => {
  res.send('Folder created');
};

export { postMethod, getMethod };