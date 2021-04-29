import { User } from '../models/userModel'
import models from '../../config/dbConnection'

class UserService {
    users: User[] = [{
        username: 'goshu',
        password: 'goshu',
        email: 'goshu@goshu.goshu',
        firstName: 'goshko',
        lastName: 'goshkov'
    }, {
        username: 'goshu1',
        password: 'goshu1',
        email: 'goshu1@goshu1.goshu1',
        firstName: 'goshko1',
        lastName: 'goshkov1'
    }];

    constructor() {

    };

    async addUser(user: User) {
        await this.isCorrect(user);
        this.users.push(user);
        return user;
    };

    private isCorrect({username, password, email, firstName, lastName}: User) {
        return new Promise( (resolve, reject) => {
            if(!(username && password && email && firstName && lastName)) {
                reject('Missing key');
            } 
            resolve(true);
        });
    };

    createUser = async () => {
        const user = new models.User(this.users[0]);
    };

    private exists(email: string, password: string) {
        return new Promise( (resolve, reject) => {
            for (let i = 0; i < this.users.length; i++) {
                console.log(this.users[i])
                if(this.users[i].email == email && this.users[i].password == password) {
                    resolve(true);
                }
            }
            reject("User doesn't exists");
        });
    }

    login = async (email: string, password: string) => {
        return this.exists(email, password);
    }
    
}



export default new UserService();


