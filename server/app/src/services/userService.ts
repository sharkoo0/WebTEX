import { User } from '../models/userModel'

class UserService {
    users: User[] = [{
        username: 'goshu',
        email: 'goshu@goshu.goshu',
        firstName: 'goshko',
        lastName: 'goshkov'
    }, {
        username: 'goshu1',
        email: 'goshu1@goshu1.goshu1',
        firstName: 'goshko1',
        lastName: 'goshkov1'
    }];

    constructor() {

    }

    async addUser(user: User) {
        await this.isCorrect(user);
        this.users.push(user);
        return user;
    }

    private isCorrect({username, email, firstName, lastName}: User) {
        return new Promise( (resolve, reject) => {
            if(!(username && email && firstName && lastName)) {
                reject('Missing key');
            } 
            resolve(true);
        });
        
    }
}

export default new UserService();

