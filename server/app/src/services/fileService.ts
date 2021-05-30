// import { File } from '../models/fileModel';
// import models from '../../config/dbConnection';

// class FileService {
//   files: File[] = [
//     {
//       name: 'string',
//       mimetype: 'string',
//       destination: '../../../../info',
//       path: '../../../../info/goshu',
//       size: 10,
//       owner: {
//         username: 'goshu',
//         password: 'goshu',
//         email: 'goshu@goshu.goshu',
//         firstName: 'goshko',
//         lastName: 'goshkov',
//       },
//     },
//   ];

//   constructor() {}

//   async addFile(file: File) {
//     await this.isCorrect(file);
//     this.files.push(file);
//     return file;
//   };

//   async addFiles(files: any) {
//     files.forEach((el: File) => {
//       this.addFile(el);
//     });

//     return files;
//   }

//   private isCorrect({name, path, owner}: File) {
//     return new Promise((resolve, reject) => {
//       if(!path) {
//         reject('No selected file');
//       }
//       const user = path.substr(path.indexOf('./info/'), path.length).substr(0, path.substr(path.indexOf('./info/'), path.length).indexOf('/'));
//       // if(user !== owner.username) {
//       //   reject('Incorrect owner');
//       // }
//       resolve(true);
//     })
//   };

//   createFile = async () => {
//     const file = new models.File(this.files[0]);
//   }

//   deleteFile = async (path: string) => {
//     this.files.forEach((el, index) => {
//       if(el.path == path) {
//         this.files.splice(index, 1);
//       }
//     });
//   }
// }

// export default new FileService();
