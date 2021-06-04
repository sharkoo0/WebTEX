import { Folder } from '../models/folderModel';
import models from '../../config/dbConnection';
import FolderSchema from '../schemas/folderSchema';
import mongoose from 'mongoose';


class FolderService {
    folders: Folder[] = [
        {
            name: 'string',
            destination: '../../../../info',
            path: '../../../../info/goshu',
            size: 10,
        },
    ];

    constructor() { }

    createFolder = async () => {
        const folder = new models.Folder(this.folders[0]);
      }

    // async addFolder(folder: Folder) {
    //     return new Promise((resolve, reject) => {
    //         async () => {
    //                 const newFolder = new FolderSchema({
    //                     _id: new mongoose.Types.ObjectId(),
    //                     name: folder.name,
    //                     destinaton: user.password,
    //                 });
    //                 await newFolder.save();
    //                 resolve(true);
    //             }
    //     })

    // }


}




export default new FolderService();

