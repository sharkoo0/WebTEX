import Express from 'express';
import Multer from 'multer';
import fs from 'fs';
import fileService from '../services/fileService';
import  FileSchema from '../schemas/fileSchema';
import { Upload, uploadFiles, deleteFiles } from '../controllers/fileController';
import UserSchema from '../schemas/userSchema';

const filesRouter = Express.Router();

filesRouter.post('/upload', Upload.array('file-to-upload'), uploadFiles);
filesRouter.delete('/delete', deleteFiles);

filesRouter.get('/get', async (req, res) => {
  // FileSchema.find().then(file => res.json(file));
  const filename = req.body.filename;
  const user = await UserSchema.findOne({username: req.body.username}, (err: Error, user: any) => {
    if(err) {
      res.status(400).json({"error": err});
    }
    const file = user.files;
  })
  console.log(filename);
  res.json(filename)
});

export { filesRouter };