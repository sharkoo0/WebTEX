import mongoose from 'mongoose';
const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String
        }, 
        destination: {
            type: String
        },
        path: {
            type: String
        },
        size: {
            type: Number
        },
        owner: {
          type: String
        }
    }
);

const Folder = mongoose.model('Folder', folderSchema);    

export default Folder;