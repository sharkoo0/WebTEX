import { File } from '../models/fileModel';
import models from '../../config/dbConnection';
import UserSchema from '../schemas/userSchema';
import fs from 'fs-extra';
import mongoose from 'mongoose'

class FileService {
  constructor() {}

  async addFile(file: File, path: string, name: string, username:string) {
    await this.isCorrect(file);
    console.log(path)
    const currentFile = {
      name: name,
      path: path,
      size: file.size,
      mimetype: file.mimetype,
    };
    const update = { $push: { files: currentFile } };
    return new Promise((resolve, reject) => {
      this.notExists(path, username)
        .then(async () => {
          UserSchema.updateOne({ username: username }, update).then((u: any) => {
            console.log(u);
          }).catch((err: Error) => console.log(err));
        })
        .catch((err) => console.log('ERROR: ' + err));
    });
  }

  async addFiles(files: Array<any>, path: string, names: Array<string>, username: string) {
    let counter = 0;
    files.forEach((el: any) => {
      this.addFile(el, path, names[counter], username);
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

  deleteFile = async (path: string, username: string) => {
    const remove = { $pull: { files: {path: path} } };
    await UserSchema.findOne({username: username}).exec().then(async (u: any) => {
      await UserSchema.updateOne({username: u.username}, remove).then((u: any) => {
        console.log(u);
      }).catch((err: Error) => console.log(err));
    })
  };

  private notExists = async (filepath: string, username: string) => {
    return new Promise(async (resolve, reject) => {
      const user = await UserSchema.findOne({username: username}).select('files').exec();
      if (user) {
        const file = user.get('files', null, { getters: false});
        if (file) {
          file.forEach((el: any) => {
            if(el.path === filepath) {
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
