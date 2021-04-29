import Express from 'express';
import Cors from 'cors';
import { userRouter } from './routes/user';
import { loginRouter } from './routes/login';
import models, { connectDB } from '../config/dbConnection';
import path from 'path';
import { Mongoose } from 'mongoose';

const app = Express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(Cors({ origin: '*' }));
app.use(Express.json());

app.use('/register', userRouter);
app.use('/login', loginRouter);
app.get('/', (req, res) => {
  res.sendFile("../../../client1/html/index.html");
});

// app.get('/', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, '../../../client/public/html', 'registration.html')
//   );
// });

// app.get('/auth.css', function (req, res) {
//   res.sendFile(path.join(__dirname, '../../../client/css', 'auth.css'));
// });

// app.use('/static', Express.static(path.join(__dirname, 'public')));

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
