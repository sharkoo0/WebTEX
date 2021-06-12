import Express from 'express';
import Multer from 'multer';
import fs from 'fs-extra';
import fileService from '../services/fileService';
import FileSchema from '../schemas/fileSchema';
import jwt from 'jsonwebtoken';

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

// const genToken = (username: string) => {
//   return jwt.sign(
//     {
//       name: username,
//     },
//     'TOPSECRETCODE',
//     {
//       expiresIn: '15s',
//     }
//   );
// }

const genShortToken = async (req: Express.Request, res: Express.Response) => {
  const token = jwt.sign(
    {
      name: res.locals.username
    },
    'TOPSECRETCODE',
    {
      expiresIn: '15s',
    }
  );
  console.log(token)
  res.json({'token': token});
}

const uploadFiles = async (req: Express.Request, res: Express.Response) => {
  try {
    // console.log(req);
    const newFiles = req.files as Array<any>;
    console.log(req.body.files)
    console.log(newFiles)
    // console.log(req.query.username);
    // if(!req.query.username) {
    //   console.log(req.query.username)
    //   res.status(401).json("error: Invalid username");
    //   return;
    // }

    let names: Array<string> = [];
    newFiles.forEach((el: any) => {
      names.push(el.originalname);
    })

    let folder = req.body.folder;
    if(newFiles) {  
      
      newFiles.forEach((el: any) => {
        if(folder){
          console.log(req.body.username)
          const path = '../../info/' + req.body.username + '/' + req.body.folder + '/' + el.filename;
          console.log(path)
          fs.move('../../info/' + el.filename, path).then(() => {
            console.info("File moved")
            fileService.addFiles(newFiles, path, names, req.body.username).then(() => {
              res.status(201).json(newFiles);
              return;
            }).catch(err => {
              res.status(400).json({'error': err})
              return;
            });
          }).catch((err: Error) => {
            console.log(err);
            res.status(400).json(err.message);
            return;
          });
        } else {
          const path = '../../info/' + req.body.username + '/' + el.filename;
          fs.move('../../info/' + el.filename, path).then(() => {
            console.log("File moved")
            fileService.addFiles(newFiles, path, names, req.body.username).then(() => {
              res.status(201).json(newFiles);
              return;
            }).catch(err => {
              res.status(400).json({'error': err})
              return;
            });
          }).catch((err: Error) => {
            console.log(err);
            res.status(400).json(err.message);
            return;
          });
        }
        
      })
    }
  } catch(error) {
    console.log(error)
    res.send(error);
  }
};

const deleteFiles = async (req: Express.Request, res: Express.Response) => {
  let { path } = req.body;
  console.log(path)
  path = path.split('\\').join('/');
  console.log(path)
  path = '../../info/' + req.body.username + '/' + path;
  console.log(path)
  try {
    await fileService.deleteFile(path, req.body.username);
    fs.unlink(path, function(err) {
      if (err) {
        res.status(500).send(err);
        return;
      } else {
        res.status(200).send("Successfully deleted the file.");
        console.log("Successfully deleted the file.");
      }
    });
  } catch(error) {
    res.send(error);
  }  
};

export { Upload, uploadFiles, deleteFiles, genShortToken };