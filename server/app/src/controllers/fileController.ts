import Express from 'express';
import Multer from 'multer';
import fs from 'fs-extra';
import fileService from '../services/fileService';
import FileSchema from '../schemas/fileSchema';

let name = "";
const genFolderName = (folderName: String) => {
  return new String('../../info/' + folderName);
};

function storageUpload(){
  const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(name);
      cb(null, '../../info/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
  return storage;
};

let Upload = Multer({
  storage: storageUpload()
}
);

const uploadFiles = async (req: Express.Request, res: Express.Response) => {
  try {
    const newFiles = req.files as Array<any>;
    if(!req.body.username) {
      res.status(401).json("error: Invalid username");
    }

    let names: Array<string> = [];
    newFiles.forEach((el) => {
      names.push(el.originalname);
    })

    if(newFiles) {  
      newFiles.forEach(el => {
        fs.move('../../info/' + el.filename, '../../info/' + req.body.username + '/' + el.filename).then(() => {
          console.log("File moved")
          // res.status(200).json("message: File uploaded");
        }).catch((err: Error) => {
          console.log(err);
          // res.status(400).json(err.message);
        });
      })
    
  
      fileService.addFiles(newFiles, '../../info/' + req.body.username, names).then(() => {
        res.status(201).json(newFiles);
      }).catch(err => res.json({'error': err}));
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