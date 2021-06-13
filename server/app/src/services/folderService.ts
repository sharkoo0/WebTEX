import { Folder } from '../models/folderModel';
import models from '../../config/dbConnection';
import FolderSchema from '../schemas/folderSchema';
import mongoose from 'mongoose';

class FolderService {
  constructor() {}
  async addFolder(name: string) {
    return new Promise((resolve, reject) => {
      const newFolder = new FolderSchema({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        destinaton: 'test',
        path: 'test',
        size: 10,
      });

      newFolder
        .save()
        .then(() => {
          resolve(true);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
}

export default new FolderService();
