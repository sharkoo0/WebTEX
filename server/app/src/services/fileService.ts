import { File } from '../models/fileModel';
import models from '../../config/dbConnection';
import fs from 'fs';

class FileService {
  files: File[] = [
    {
      name: 'string',
      mimetype: 'string',
      destination: '../../../../info',
      path: '../../../../info/goshu',
      size: 10,
    },
  ];

  constructor() {}

  async addFile(file: File, path: string) {
    await this.isCorrect(file);
    // fs.writeFile(file.path, File);
    this.files.push(file);
    return file;
  };

  async addFiles(files: any, path: string) {
    files.forEach((el: File) => {
      this.addFile(el, path);
    });

    return files;
  }

  private isCorrect({name, path}: File) {
    return new Promise((resolve, reject) => {
      if(!path) {
        reject('No selected file');
      }
      const user = path.substr(path.indexOf('./info/'), path.length).substr(0, path.substr(path.indexOf('./info/'), path.length).indexOf('/'));
      // if(user !== owner.username) {
      //   reject('Incorrect owner');
      // }
      resolve(true);
    })
  };

  createFile = async () => {
    const file = new models.File(this.files[0]);
  }

  deleteFile = async (path: string) => {
    this.files.forEach((el, index) => {
      if(el.path == path) {
        this.files.splice(index, 1);
      }
    });
  }
}

export default new FileService();
