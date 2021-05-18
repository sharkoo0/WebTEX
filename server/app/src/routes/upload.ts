import Express from "express"
import Multer from "multer"

const storageSingleUpload = Multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, '../../info');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

const Upload = Multer({
  storage: storageSingleUpload
});

const uploadRouter = Express.Router();

const upload = (req: Express.Request, res: Express.Response) => {
  if(req.body.files) {
    const uploadedFiles = req.body.files;
      res.status(200).json({
          files: req.body.files
      });
  } else {
    res.status(500).json({error: "No selected file/s"});
  }
};

// uploadRouter.post('/upload', Upload.array("file-to-upload"), upload);
uploadRouter.post('/', Upload.array('file-to-upload'), (req, res) => {
    // res.redirect('/');
    if (req.files) {
        const uploadedFiles = req.files;
        res.status(200).json({
            files: req.files
        });
    } else {
        res.status(500).json({ error: "No such a file" });
    }
});
export {uploadRouter};