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
      name: names,
      path: path,
      size: file.size,
      mimetype: file.mimetype,
    };
    temp.files.push(currentFile);
    const update = { $push: { files: currentFile } };
    await db.updateOne({ username: username}, update);
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

  deleteFile = async (path: string) => {};

}

export default new FileService();
