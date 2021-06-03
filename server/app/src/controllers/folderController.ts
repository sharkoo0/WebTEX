import Express from 'express';
import { Folder } from '../models/folderModel';
import Multer from 'multer';
import fs from 'fs';
import FolderSchema from '../schemas/folderSchema';
import FolderService from '../services/folderService';

const postMethod = async (req: Express.Request, res: Express.Response) => {
  const body: Folder = req.body;
  console.log(req.body);
  if (body) {
    // await FolderService.change(body.name).then(() => {
    //   res.sendStatus(200);
    // }).catch(error => {
    //   // res.redirect('/');
    //   res.sendStatus(401);
    //   console.log(error);
    // })
  }
};

const getMethod = async(req: Express.Request, res: Express.Response) => {
  res.send('Folder created');
};

export { postMethod, getMethod };