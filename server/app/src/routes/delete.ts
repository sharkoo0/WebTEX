import Express from "express";
import fs from "fs";
import Multer from "multer";

const deleteRouter = Express.Router();

const deleteFile = async (req: Express.Request, res: Express.Response) => {
  const file = req.body.file;
  const path = req.body.path;
  try{ 
    await fs.promises.access(path, fs.constants.R_OK | fs.constants.W_OK);
    console.log("Access granted");
    fs.readdirSync(path);
    if(fs.lstatSync(file).isFile()) {
      fs.rmSync(file);
    } else {
      console.error("The file doesn't exists");
      return;
    }
  } catch {
    console.log("You don't have permission to this file/folder");
  }
};

deleteRouter.post('/:fileId', deleteFile);

export {deleteRouter};