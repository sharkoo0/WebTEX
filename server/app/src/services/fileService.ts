import { File } from '../models/fileModel';
import models from '../../config/dbConnection';
import UserSchema from '../schemas/userSchema';
import fs from 'fs-extra';

class FileService {
  constructor() {}

  async addFile(file: File, path: string) {
    const username = path.substr(path.lastIndexOf('/') + 1);
    // console.log(username)
    // console.log(file.name)
    await this.isCorrect(file);
    const currentFile = {
      name: file.name,
      path: path + file.name,
      size: file.size,
      mimetype: file.mimetype,
    };
    // fs.writeFile(file.path, File);
    // fs.move('../../info/' + file.name, '../../info/' + username + '/' + file.name);
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

  async addFiles(files: Array<any>, path: string) {
    files.forEach(async (el: File) => {
      await this.addFile(el, path);
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
      // if(user !== owner.username) {
      //   reject('Incorrect owner');
      // }
      resolve(true);
    });
  }

  createFile = async () => {
    // const file = new models.File(this.files[0]);
  };

  deleteFile = async (path: string) => {};

  private notExists = async (filename: string, username: string) => {
    const currentUser = UserSchema.find({ username: username });
    return new Promise(async (resolve, reject) => {
      // const user = await UserSchema.findOne({ username: username }, { files: { name: filename}}).exec();
      const user = await UserSchema.findOne({username: username}).select('files').exec();
      console.log(typeof(user));
      // user?.$where({name: filename});
      if (user) {
        const file = user.collection.find({ files: { 'name': filename } });
        if (file) {
          console.log('in if');
          console.log(file.toArray.length)
          console.log(file.toArray.name)
          //   reject('File already exists in this directory');
          // }
          // forEach((element: any) => {
          //   console.log('in for');
          //   console.log(element.filename);
          //   if (element.filename === filename) {
          //     reject('File already exists in this directory');
          //   }
          // });
          // file.forEach(el => {
          //   console.log('in for');
          //   console.log(el.filename);
          //   if (el.filename === filename) {
          //     reject('File already exists in this directory');
          //   }
          // });
          console.log('end of if')
        } else {
          resolve(true);
        }
        
      }
      reject('Incorrect user');
    });
  };
}

export default new FileService();
