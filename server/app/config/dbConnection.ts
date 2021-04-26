// import { mongoose } from ' mongoose';
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:U541P8Uxn0qWWo6S@cluster0.y1wfg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect((err: Error) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// export { client };

import mongoose from 'mongoose';
import User from '../src/schemas/userSchema';

const connectDB = () => {
    return mongoose.connect(`${process.env.DATABASE_URL}`, { useUnifiedTopology: true , useNewUrlParser: true});
}

const models = { User };
export { connectDB };
export default models;