import Express from 'express';
import { Folder } from '../models/folderModel';
import FolderSchema from '../schemas/folderSchema';
import FolderService from '../services/folderService';
import fs from 'fs';

const postMethod = async (req: Express.Request, res: Express.Response) => {
  const newFolder: Folder = req.body;
  if (newFolder) {
    if (req.body.path) {
      if (
        fs.existsSync(
          '../../info/' +
            req.body.username +
            '/' +
            req.body.path +
            '/' +
            req.body.name
        )
      ) {
        res.status(400).json('Error: Folder already exists');
        return;
      }
      fs.mkdir(
        '../../info/' +
          req.body.username +
          '/' +
          req.body.path +
          '/' +
          req.body.name,
        { recursive: true },
        (err) => {
          if (err) {
            res.status(400).json({ error: err });
            return;
          }
        }
      );
    } else {
      if (
        fs.existsSync('../../info/' + req.body.username + '/' + req.body.name)
      ) {
        res.status(400).json('Error: Folder already exists');
        return;
      }
      fs.mkdir(
        '../../info/' + req.body.username + '/' + req.body.name,
        { recursive: true },
        (err) => {
          if (err) {
            res.status(400).json({ error: err });
            return;
          }
        }
      );
    }
    await FolderService.addFolder(newFolder.name)
      .then(() => {
        res.status(200).json('msg: Successfully created folder');
      })
      .catch((error) => {
        res.sendStatus(401);
      });
  }
};

const getMethod = async (req: Express.Request, res: Express.Response) => {
  res.send('Folder created');
};

export { postMethod, getMethod };
