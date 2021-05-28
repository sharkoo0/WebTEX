import Express from 'express';
import Cors from 'cors';
import { saveRouter } from './routes/save';
import { createRouter } from './routes/create-folder';
import { uploadRouter } from './routes/upload';
import { authRouter } from './routes/auth';
import { filesRouter } from './routes/files';
import models, { connectDB } from '../config/dbConnection';
import path from 'path';
import { Mongoose } from 'mongoose';

const app = Express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(Cors({ origin: '*' }));
app.use(Express.json());

app.use('/auth', authRouter);
app.use('/files', filesRouter);
// app.use('/user', userRouter)
// app.use('/upload', uploadRouter);
app.get('/', (req, res) => {
  res.sendFile('../../../client1/html/index.html');
});

app.use('/save', saveRouter);
app.use('/create-folder', createRouter) ;
connectDB()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}!`);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}!`);
// });
