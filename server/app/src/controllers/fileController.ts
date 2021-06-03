import Express from 'express';
import Multer from 'multer';
import fs from 'fs';
import fileService from '../services/fileService';
import FileSchema from '../schemas/fileSchema';
import { isParenthesizedExpression } from 'typescript';

let name = "";
const genFolderName = (folderName: String) => {
  return new String('../../info/' + folderName);
};

function storageUpload(path: string){
  const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(name);
      cb(null, '../../info/' + path);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
  return storage;
};

let Upload = Multer();

const uploadFiles = async (req: Express.Request, res: Express.Response) => {
  try {
    const newFiles = req.files;
    console.log(typeof(newFiles))
    console.log(req.params.username)
    Upload = Multer({
      storage: storageUpload(req.params.username)
    });

    console.log((newFiles));
    if(newFiles) {
      const file = new FileSchema({
        file: newFiles,
        // name: ,
        // mimetype: "jfklsdjf",
        // destination: "fjsdk",
        // path: "fhaskd",
        // size: 123456,
        owner: req.params.username
      });
      file.save();
  
      const files = await fileService.addFiles(newFiles, '../../info/' + req.params.username);
      res.json(newFiles);
    } else {
      res.sendStatus(400);
    }
  } catch(error) {
    res.send(error);
  }
};

const deleteFiles = async (req: Express.Request, res: Express.Response) => {
  let { path } = req.body;
  path = path.split('\\').join('/');
  try {
    fileService.deleteFile(path);
    fs.unlink(path, function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send("Successfully deleted the file.");
        console.log("Successfully deleted the file.");
      }
    });
  } catch(error) {
    res.send(error);
  }  
};

export { Upload, uploadFiles, deleteFiles };