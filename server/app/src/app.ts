import Express from 'express';
import Cors from 'cors';
import { userRouter } from './routes/user'
import models, { connectDB } from '../config/dbConnection'

const app = Express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(Cors({origin: '*'}));
app.use(Express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('zadara');
});

connectDB().then(async () => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}!`);
    });
}).catch((error: Error) => {
    console.log(error);
});
