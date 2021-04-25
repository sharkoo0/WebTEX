import Express from 'express';
import Cors from 'cors';
import { userRouter } from './routes/user'

const app = Express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(Cors({origin: '*'}));
app.use(Express.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('zadara');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});