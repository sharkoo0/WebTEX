import Express from 'express';
import Multer from 'multer';
import fs from 'fs-extra';
import fileService from '../services/fileService';
import FileSchema from '../schemas/fileSchema';
import UserSchema from '../schemas/userSchema';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';

let name = "";
const genFolderName = (folderName: String) => {
  return new String('../../info/' + folderName);
};

function storageUpload() {
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
  res.json({ 'token': token });
}

const uploadFiles = async (req: Express.Request, res: Express.Response) => {
  try {
    // console.log(req);
    // console.log(req.files)
    const newFiles = req.files as Array<any>;
    const username: string | undefined = req.query.username?.toString();
    // console.log(req.body.files)
    // console.log(newFiles)
    // console.log(typeof req.query.username)
    // res.status(200).json(req.query.username);
    // return;
    // console.log(username);
    if(!username || !req.query.token) {
      // console.log(username)
      res.status(401).json("error: Invalid username");
      return;
    }

    let names: Array<string> = [];
    newFiles.forEach((el: any) => {
      names.push(el.originalname);
    })

    let folder: string | undefined = req.query.folder?.toString();
    folder = folder?.substr(0, folder.lastIndexOf('/') - 1);
    // console.log(folder)
    if(newFiles) {  
      
      newFiles.forEach((el: any) => {
        if(folder && folder !== '/'){
          console.log(folder)
          const path = '../../info/' + req.query.username + '/' + folder + '/' + el.filename;
          console.log(path)
          fs.move('../../info/' + el.filename, path).then(() => {
            console.info("File moved")
            fileService.addFiles(newFiles, path, names, username).then(() => {
              res.status(201).json(newFiles);
              return;
            }).catch(err => {
              res.status(400).json({ 'error': err })
              return;
            });
          }).catch((err: Error) => {
            console.log(err);
            res.status(400).json(err.message);
            return;
          });
        } else {
          const path = '../../info/' + req.query.username + '/' + el.filename;
          fs.move('../../info/' + el.filename, path).then(() => {
            console.log("File moved")
            fileService.addFiles(newFiles, path, names, username).then(() => {
              res.status(201).json(newFiles);
              return;
            }).catch(err => {
              res.status(400).json({ 'error': err })
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
  } catch (error) {
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
    fs.unlink(path, function (err) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      } else {
        res.status(200).send("Successfully deleted the file.");
        console.log("Successfully deleted the file.");
      }
    });
  } catch (error) {
    res.send(error);
  }
};

const deleteFolder = async (req: Express.Request, res: Express.Response) => {
  const username = req.body.username;
  const folderpath = req.body.path;
  const path = '../../info/' + username + '/' + folderpath;
  const files = (await UserSchema.findOne({ username: username }).select('files').exec()).files;

  files.forEach(async (el: any) => {
    if (el.path.startsWith(path)) {
      await fileService.deleteFile(el.path, username);
      await fs.rmdir(path, { recursive: true });
    }
  })
}

const findAllFiles = (files : Array<any>, searchedFileName : string, foundFiles : Array<any> = []) => {
  if (files.length === 0) return foundFiles;

  for (const item of files) {
    if (Array.isArray(item) && item.length > 0) findAllFiles(item, searchedFileName, foundFiles);
    if (!Array.isArray(item) && item.name === searchedFileName) foundFiles.push(item);
  }
  return foundFiles;
}

const searchFile = async (req: Express.Request, res: Express.Response) => {
  const filename = req.body.filename;

  const findFile =
    async (err: Error, userData: any) => {
      if (err) { //user is not found
        return res.status(400).json({ error: err });
      } else {
        const files: Array<any> = userData.files;
        const sharedFiles: Array<any> = userData.sharedFiles;
        if (filename === "") return res.status(200).json(files);

        const foundMyFiles = findAllFiles(files, filename);
        const foundSharedFiles = findAllFiles(sharedFiles, filename);

        const allFoundFiles = [...foundMyFiles, ...foundSharedFiles];
        return res.status(200).json(allFoundFiles);
      }
    };
  await UserSchema.findOne({ username: req.body.username }, findFile);
};

export { Upload, uploadFiles, deleteFiles, genShortToken, deleteFolder, searchFile };