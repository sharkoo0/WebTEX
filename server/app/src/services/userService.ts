import { User } from '../models/userModel';
import { userDetails } from '../models/userModel';
import models from '../../config/dbConnection';
import UserSchema from '../schemas/userSchema';
import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

class UserService {
  constructor() {}

  async addUser(user: User) {
    return new Promise((resolve, reject) => {
        this.isCorrect(user);
        this.notExists(user.username)
          .then(async () => {
            const newUser = new UserSchema({
              _id: new mongoose.Types.ObjectId(),
              username: user.username,
              password: user.password,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              photoPath: user.photoPath,
              altEmail: user.altEmail,
              birthdate: user.birthdate,
              phone: user.phone,
            });
            console.log("here")
            await newUser.save();
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject("User already exists");
          });
    })
  }

  private isCorrect({ username, password, email, firstName, lastName }: User) {
    return new Promise((resolve, reject) => {
      if (!(username && password && email && firstName && lastName)) {
        reject('Missing key');
      }
      resolve(true);
    });
  }

  private notExists = (username: string) => {
    return new Promise(async (resolve, reject) => {
      const user = await UserSchema.findOne({ username: username }).exec();
      if (user) {
        reject("User already exists");
      }
      resolve(true);
    });
  };

  private exists = (email: string) => {
    return new Promise(async (resolve, reject) => {
      const user = await UserSchema.findOne({ email: email }).exec();
      if (user) {
        resolve(true);
      }
      reject("User not exists");
    });
  };

  login = async (email: string, p: string) => {
    return new Promise((resolve, reject) => {
        this.exists(email).then(() => {
          const user = UserSchema.findOne({ email: email }).exec();
            user.then((u: any) => {
              console.log("zadara")
                resolve(true);
            })
        }).catch(() => {
          reject("The user doesn't exists");
        })
    });
  };

  change = async (
    id: number,
    username: string,
    email?: string,
    phone?: string,
    altEmail?: string,
    address?: string,
    photo?: string,
    newPassword?: string,
    confNewPassword?: string
  ) => {
    const user = await UserSchema.findOne({username: username}).exec().then(async (u: any) => {
      if(u && !newPassword) {
        const pass = await UserSchema.findOne({username: username}).select('password').exec();
        newPassword = pass?.get('password');        
      }
      await UserSchema.findOneAndUpdate(
        { username: username },
        {
          email: email,
          phone: phone,
          altEmail: altEmail,
          address: address,
          photoPath: photo,
          password: newPassword,
        }
      )
    })
  };

  addFile = async (username: String) => {};
}

export default new UserService();
