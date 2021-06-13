import Express from 'express';
import FileService from '../services/fileService';

const shareFolder = async (req: Express.Request, res: Express.Response) => {
  FileService.shareFolder(
    req.body.sender,
    req.body.recipient,
    req.body.filepath
  )
    .then(() => {
      res.status(200).json('message: Folder shared successfully');
    })
    .catch((err: Error) => {
      res.status(400).json({ error: err });
    });
};

const shareFile = async (req: Express.Request, res: Express.Response) => {
  const filepath = '../../info/' + req.body.sender + '/' + req.body.filepath;
  FileService.shareFile(req.body.sender, req.body.recipient, filepath)
    .then(() => {
      res.status(200).json('message: File shared successfully');
    })
    .catch((err: Error) => {
      console.log('here');
      res.status(400).json({ error: err });
    });
};

export { shareFolder, shareFile };
