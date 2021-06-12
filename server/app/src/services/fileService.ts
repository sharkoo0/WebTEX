import { File } from '../models/fileModel';
import models from '../../config/dbConnection';
import UserSchema from '../schemas/userSchema';
import fs from 'fs-extra';
import mongoose from 'mongoose'

class FileService {
  constructor() {}

  async addFile(file: File, path: string, names: string) {
    const username = path.substr(path.lastIndexOf('/') + 1);
    const db = mongoose.connection.db.collection('users');
    const temp = await db.findOne({ username: username});
    await this.isCorrect(file);
    const currentFile = {
      name: file.name,
      path: path + file.name,
      size: file.size,
      mimetype: file.mimetype,
    };
    temp.files.push(currentFile);
    const update = { $push: { files: currentFile } };
    const currentUser = UserSchema.find({ username: username }).exec();
    return new Promise((resolve, reject) => {
      this.notExists(file.name, username)
        .then(async () => {
          await UserSchema.updateOne({ username: username }, update).exec();
        })
        .catch((err) => console.log('ERROR: ' + err));
    });

    // console.log(currentUser);
    // const user = UserSchema.findOneAndUpdate(
    //   {username: path.substr(path.lastIndexOf('/') + 1)},
    //   {
    //     $addToSet: {
    //       files: {
    //         "name": file.name,
    //         "path": path,
    //         "size": file.size,
    //         "mimetype": file.mimetype
    //       }
    //     }
    //   }
    // )

    return file;
  }

  async addFiles(files: Array<any>, path: string, names: Array<string>) {
    let counter = 0;
    files.forEach((el: File) => {
      this.addFile(el, path, names[counter]);
      console.log('counter' + counter)
      counter++;
    });

    return files;
  }

  private isCorrect({ name, path }: File) {
    return new Promise((resolve, reject) => {
      if (!path) {
        reject('No selected file');
      }
      const user = path
        .substr(path.indexOf('./info/'), path.length)
        .substr(
          0,
          path.substr(path.indexOf('./info/'), path.length).indexOf('/')
        );
      resolve(true);
    });
  }

  deleteFile = async (path: string, filename: string) => {
    console.log(path);
    const username = path.substr(path.lastIndexOf('/') + 1);
    //const db = mongoose.connection.db.collection('users');
    const db = await UserSchema.findOne({username: username}).select("files username").exec();
    //const temp = await db.findOne({ username: username});
    
    const files = db?.get('files');
    console.log(db);
    console.log(username);
    console.log(files);
    
    // temp.files.delete(currentFile);
    // const delete = { $delete: { files: currentFile } };
    // await db.deleteOne({ username: username, files: currentFile}, delete);
    // return file;
  };

}

export default new FileService();
