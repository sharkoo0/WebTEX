import { File } from '../models/fileModel';
import models from '../../config/dbConnection';
import UserSchema from '../schemas/userSchema';
import fs from 'fs-extra';
import mongoose from 'mongoose';

class FileService {
  constructor() {}

  async addFile(file: File, path: string, name: string, username: string) {
    await this.isCorrect(file);
    console.log(path);
    const currentFile = {
      name: name,
      path: path,
      size: file.size,
      mimetype: file.type,
    };
    const update = { $push: { files: currentFile } };
    return new Promise((resolve, reject) => {
      this.notExists(path, username)
        .then(async () => {
          UserSchema.updateOne({ username: username }, update)
            .then((u: any) => {
              resolve(true);
            })
            .catch((err: Error) => console.error(err));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addFiles(
    files: Array<any>,
    path: string,
    names: Array<string>,
    username: string
  ) {
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
    const remove = { $pull: { files: { path: path } } };
    UserSchema.findOne({ username: username })
      .exec()
      .then(async (u: any) => {
        await UserSchema.updateOne({ username: u.username }, remove)
          .then((u: any) => {})
          .catch((err: Error) => console.log(err));
      });
  };

  private notExists = async (filepath: string, username: string) => {
    return new Promise(async (resolve, reject) => {
      const user = await UserSchema.findOne({ username: username })
        .select('files')
        .exec();
      if (user) {
        const file = user.get('files', null, { getters: false });
        if (file) {
          file.forEach((el: any) => {
            if (el.path === filepath) {
              reject('File already exists');
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

  async shareFile(usernameFrom: string, usernameTo: string, filepath: string) {
    return new Promise(async (resolve, reject) => {
      const user = await UserSchema.findOne({ username: usernameFrom })
        .select('files')
        .exec();
      if (user) {
        const files = user.get('files', null, { getters: false });
        files.forEach(async (el: any) => {
          if (el.path === filepath) {
            const userTo = await UserSchema.findOne({
              username: usernameTo,
            }).exec();
            if (userTo) {
              const sharePath =
                '../../shared/' + usernameTo + '/' + usernameFrom;
              fs.access(sharePath, async (err: Error) => {
                if (err) {
                  fs.mkdir(sharePath, { recursive: true });
                }
              });
              fs.copyFile(
                filepath,
                '../../shared/' +
                  usernameTo +
                  '/' +
                  usernameFrom +
                  '/' +
                  el.name,
                (err) => {
                  if (err) {
                    reject(err);
                  }
                }
              );
              const newSharedFile = {
                name: el.name,
                path:
                  '../../shared/' +
                  usernameTo +
                  '/' +
                  usernameFrom +
                  '/' +
                  el.name,
                size: el.size,
                mimetype: el.mimetype,
                owner: usernameFrom,
              };
              const addShareFile = {
                $addToSet: { sharedFiles: newSharedFile },
              };
              UserSchema.updateOne({ username: usernameTo }, addShareFile)
                .then((u: any) => {
                  resolve(true);
                })
                .catch((err: Error) => {
                  reject('Cannot share this file');
                });
            } else {
              // reject('Invalid recipient');
            }
            resolve(true);
            return;
          } else {
            // reject('Invalid filepath');
          }
        });
      } else {
        // reject('Invalid sender');
      }
    });
  }

  async shareFolder(
    usernameFrom: string,
    usernameTo: string,
    folderpath: string
  ) {
    return new Promise(async (resolve, reject) => {
      const sender = await UserSchema.findOne({ username: usernameFrom })
        .select('files')
        .exec();
      if (!sender) {
        reject('Sender not found');
      }
      const senderFiles = sender.files;
      if (!senderFiles) {
        reject('Folder not found');
      }
      const recipient = await UserSchema.findOne({
        username: usernameTo,
      }).exec();
      if (!recipient) {
        reject('Recipient not found');
      }
      const path = folderpath.substr(
        folderpath.lastIndexOf('/' + usernameFrom + '/') +
          usernameFrom.length +
          2
      );
      senderFiles.forEach((el: any) => {
        if (el.path.includes(folderpath)) {
          fs.access(
            '../../shared/' +
              usernameTo +
              '/' +
              usernameFrom +
              '/' +
              path.substr(0, path.lastIndexOf('/')),
            (err: Error) => {
              if (err) {
                fs.mkdir(
                  '../../shared/' +
                    usernameTo +
                    '/' +
                    usernameFrom +
                    '/' +
                    path.substr(0, path.lastIndexOf('/')),
                  { recursive: true }
                )
                  .then(() => {})
                  .catch((err: Error) => {});
              } else {
                console.log('The folder exists');
              }
            }
          );
          const newElPath = el.path.replace(
            '../../info',
            '../../shared/' + usernameTo
          );
          fs.copyFile(el.path, newElPath);
          const newSharedFile = {
            name: el.name,
            path: newElPath,
            size: el.size,
            mimetype: el.mimetype,
            owner: usernameFrom,
          };
          const addShareFile = { $push: { sharedFiles: newSharedFile } };
          UserSchema.updateOne({ username: usernameTo }, addShareFile)
            .then((u: any) => {
              resolve(true);
            })
            .catch((err: Error) => {
              reject('Cannot share this file');
            });
        }
      });
    });
  }
}

export default new FileService();
