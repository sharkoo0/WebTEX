import Express from 'express';
import Multer from 'multer';
import fs from 'fs';
import fileService from '../services/fileService';
import  FileSchema from '../schemas/fileSchema';
import { Upload, uploadFiles, deleteFiles } from '../controllers/fileController';

const filesRouter = Express.Router();

filesRouter.post('/upload', Upload.array('file-to-upload'), uploadFiles);
filesRouter.delete('/delete', deleteFiles);

filesRouter.get('/get', (req, res) => {
  // FileSchema.find().then(file => res.json(file));
  const filename = req.body.filename;
  console.log(filename);
  res.json(filename)
});

export { filesRouter };