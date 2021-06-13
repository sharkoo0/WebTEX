import Express from 'express';
import Multer from 'multer';
import fs from 'fs';
import fileService from '../services/fileService';
import FileSchema from '../schemas/fileSchema';
import {
  Upload,
  uploadFiles,
  deleteFiles,
  genShortToken,
  deleteFolder,
  searchFile,
} from '../controllers/fileController';
import UserSchema from '../schemas/userSchema';
import mongoose from 'mongoose';
import path from 'path';

const filesRouter = Express.Router();

filesRouter.post('/upload', Upload.array('files'), uploadFiles);
filesRouter.delete('/delete/file', deleteFiles);
filesRouter.delete('/delete/folder', deleteFolder);
filesRouter.get('/token', genShortToken);

filesRouter.get('/search/:filename', searchFile);

filesRouter.get('/all', async (req, res) => {
  if (!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }

  const userFiles = await UserSchema.findOne({ username: req.query.username })
    .select('files')
    .exec();
  res.status(200).json({ files: userFiles.files });
});

filesRouter.get('/allShared', async (req, res) => {
  if (!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }

  const userFiles = await UserSchema.findOne({ username: req.query.username })
    .select('sharedFiles')
    .exec();
  res.status(200).json({ files: userFiles.sharedFiles });
});

filesRouter.get('/download', (req, res) => {
  UserSchema.findOne({ username: req.query.username })
    .select('files')
    .exec()
    .then((obj: any) => {
      const files = obj.files;
      files.forEach((el: any) => {
        if (el.name === req.query.filename) {
          const filepath = el.path;
          res.download(path.resolve(__dirname + '../../../' + filepath));
          return;
        }
      });
    })
    .catch((err: Error) => {
      res.status(404).json({ 'error: ': err });
    });
});

export { filesRouter };
