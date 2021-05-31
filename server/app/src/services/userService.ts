import { User } from '../models/userModel';
import { userDetails } from '../models/userModel';
import models from '../../config/dbConnection';
import UserSchema from '../schemas/userSchema';
import mongoose from 'mongoose';

class UserService {
  constructor() {}

  async addUser(user: User) {
    return new Promise((resolve, reject) => {
        this.isCorrect(user);
        this.notExists(user.email)
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

  createUser = async () => {
    // const user = new models.User(this.users[0]);
  };

  private notExists = (email: string) => {
    return new Promise(async (resolve, reject) => {
      const user = await UserSchema.findOne({ email: email }).exec();
      if (user) {
        reject("User already exists");
      }
      resolve(true);
    });
  };

  login = async (email: string, p: string) => {
    return new Promise((resolve, reject) => {
        this.notExists(email).then(() => {
            reject("The user doesn't exists");
        }).catch(() => {
            const user = UserSchema.findOne({ email: email }).exec();
            user.then((u) => {
                resolve(u?.get("password") === p);
            })
        })
    });
  };

  change = async (
    id: number,
    email?: string,
    phone?: string,
    altEmail?: string,
    address?: string,
    photo?: string,
    newPassword?: string,
    confNewPassword?: string
  ) => {
    //     for (let i = 0; i < this.userDetails.length; i++) {
    //       if (this.userDetails[i].id == id) {
    //         // this.userDetails[i].names = names;
    //         this.userDetails[i].email = email;
    //         this.userDetails[i].phone = phone;
    //         this.userDetails[i].altEmail = altEmail;
    //         this.userDetails[i].address = address;
    //         this.userDetails[i].photo = photo;
    //         this.userDetails[i].newPassword = newPassword;
    //         this.userDetails[i].confNewPassword = confNewPassword;
    //       }
    //     }
    //     console.log(this.userDetails);
    const user = UserSchema.findOneAndUpdate(
      { id: id },
      {
        email: email,
        phone: phone,
        altEmail: altEmail,
        address: address,
        photoPath: photo,
        password: newPassword,
      }
    );
  };

  addFile = async (username: String) => {};
}

export default new UserService();
