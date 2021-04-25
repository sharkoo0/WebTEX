const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const { loginRouter } = require('./routes/loginRouter');
const { registerRouter } = require('./routes/registerRouter');
const { sharedFilesRouter } = require('./routes/sharedFilesRouter');

app.use(express.json());

app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', sharedFilesRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});