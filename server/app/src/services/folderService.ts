import { Folder } from '../models/folderModel';
import models from '../../config/dbConnection';
import FolderSchema from '../schemas/folderSchema';
import mongoose from 'mongoose';


class FolderService {
    constructor() { }

    async addFolder(name: string) {

        return new Promise((resolve, reject) => {
            this.notExists(name)
            .then(async () => {
                const newFolder = new FolderSchema({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    destinaton: "test",
                    path: "test",
                    size: 10,
                });
                await newFolder.save();
                console.log(newFolder);
                resolve(true);

            })
            .catch((err) => {
                console.log(err);
                reject("folder already exists");
              });

        });
    }


    private notExists = (name: string) => {
        return new Promise(async (resolve, reject) => {
          const folder = await FolderSchema.findOne({ name: name }).exec();
          if (folder) {
            // throw new Error("user already exist");
            reject("Folder already exists");
          }
          resolve(true);
        });
      };
    

}


export default new FolderService();

