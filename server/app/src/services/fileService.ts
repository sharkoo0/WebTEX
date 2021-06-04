import { File } from '../models/fileModel';
import models from '../../config/dbConnection';
import UserSchema from '../schemas/userSchema';
import fs from 'fs-extra';
import mongoose from 'mongoose'

class FileService {
  constructor() {}

  async addFile(file: File, path: string, names: string) {
    const username = path.substr(path.lastIndexOf('/') + 1);
    await this.isCorrect(file);
    const currentFile = {
      name: file.name,
      path: path + '/' + file.name,
      size: file.size,
      mimetype: file.mimetype,
    };
    const update = { $push: { files: currentFile } };
    const currentUser = UserSchema.find({ username: username }).exec();
    return new Promise((resolve, reject) => {
      this.notExists(file.name, username)
        .then(async () => {
          await UserSchema.updateOne({ username: username }, update).exec();
        })
        .catch((err) => console.log('ERROR: ' + err));
    });
  }

  async addFiles(files: Array<any>, path: string, names: Array<string>) {
    let counter = 0;
    files.forEach((el: File) => {
      this.addFile(el, path, names[counter]);
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

  private notExists = async (filename: string, username: string) => {
    return new Promise(async (resolve, reject) => {
      const user = await UserSchema.findOne({username: username}).select('files').exec();
      if (user) {
        const file = user.get('files', null, { getters: false});
        if (file) {
          file.forEach((el: any) => {
            if(el.name === filename) {
              console.log("File already exists")
              reject("File already exists")
            }
          });
          resolve(true);
        } else {
          resolve(true);
        }        
      }
      reject('Incorrect user');
    });
  };
}

export default new FileService();
