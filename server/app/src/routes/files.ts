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
  searchFile
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

// filesRouter.get('/search', async (req, res) => {
//   const filename = req.body.filename;
//   const user = await UserSchema.findOne(
//     { username: req.body.username },
//     async (err: Error, user: any) => {
//       if (err) {
//         res.status(400).json({ error: err });
//         return;
//       } else {
//         const file = user.files;
//         const db = mongoose.connection.db.collection('users');
//         const userFromDB = await db.findOne({ username: req.body.username });
//         const files: Array<any> = userFromDB.files;
//         let result: Array<any> = [];
//         files.forEach((file) => {
//           if (file.name === filename) {
//             result.push(file);
//             return;
//           }
//         });
//         res.status(200).json(result);
//       }
//     }
//   );
// });

filesRouter.get('/all', async (req, res) => {
  if(!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }

  const userFiles = await UserSchema.findOne({username: req.query.username}).select('files').exec();
  res.status(200).json({"files": userFiles.files});
});

filesRouter.get('/allShared', async (req, res) => {
  if(!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }

  const userFiles = await UserSchema.findOne({username: req.query.username}).select('sharedFiles').exec();
  console.log(userFiles.sharedFiles);
  res.status(200).json({"files": userFiles.sharedFiles});
});

filesRouter.get('/download', (req, res) => {
  UserSchema.findOne({username: req.query.username}).select('files').exec().then((obj: any) => {
    const files = obj.files;
    files.forEach((el: any) => {
      if(el.name === req.query.filename) {
        const filepath = el.path;
        res.download(path.resolve(__dirname + '../../../' + filepath))
        return;
      }
    })
  }).catch((err: Error) => {
    console.log(err)
    res.status(404).json({'error: ': err});
  })
})

export { filesRouter };
