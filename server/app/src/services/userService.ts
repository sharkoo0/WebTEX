import { User } from '../models/userModel';
import UserSchema from '../schemas/userSchema';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.set('useFindAndModify', false);
const SALT_ROUNDS = 10;

class UserService {
  constructor() {}

  async addUser(user: User) {
    return new Promise((resolve, reject) => {
      this.isCorrect(user)
        .then(async () => {
          this.notExists(user.username)
            .then(async () => {
              const salt = await bcrypt.genSalt(SALT_ROUNDS);
              const hash = await bcrypt.hash(user.password, salt);
              const newUser = new UserSchema({
                _id: new mongoose.Types.ObjectId(),
                username: user.username,
                password: hash,
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
              reject('User already exists');
            });
        })
        .catch((err) => {
          reject('wrong credentials');
        });
    });
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
        reject('User already exists');
      }
      resolve(true);
    });
  };

  login = async (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
      const user = await UserSchema.findOne({ email: email }).exec();
      if (user) {
        const credentials = await UserSchema.findOne({ email: email })
          .select('password')
          .exec();
        const pass = await bcrypt.compare(password, credentials.password);
        if (!pass) {
          reject('Wrong password');
        } else {
          resolve(true);
        }
      }
      reject('Wrong email');
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
    const user = UserSchema.findOne({ username: username })
      .exec()
      .then(async (u: any) => {
        if (u && !newPassword) {
          const pass = (
            await UserSchema.findOne({ username: username })
              .select('password')
              .exec()
          ).password;
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
        );
      });
  };
}

export default new UserService();
