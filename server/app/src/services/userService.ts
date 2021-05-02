import { User } from '../models/userModel'
import { userDetails } from '../models/userModel'
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
    },
    {
        username: 'test',
        password: '123456',
        email: 'test@abv.bg',
        firstName: 'test',
        lastName: 'testov'
    }
];

    userDetails: userDetails[] = [{
        id: 0,
        names:'test',
        email: 'test@abv.bg',
        altEmail: 'test1@abv.bg',
        phone: '099322991',
        address: 'adres1',
        photo: 'C:\\fakepath\\back.jpg',
        newPassword: '',
        confNewPassword: ''
    },
    {
        id: 1,
        names:'test',
        email: 'test@abv.bg',
        altEmail: 'test2@abv.bg',
        phone: '099322991',
        address: 'adres2',
        photo: 'myphoto1.jpeg',
        newPassword: '',
        confNewPassword: ''
    }

];

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
                //console.log(this.users[i].email);
                if(this.users[i].email == email && this.users[i].password == password) {
                    resolve(true);
                }
            }
            reject("User doesn't exists");
        });
    }

    login = async (email: string, password: string) => {
        console.log(email);
        return this.exists(email, password);
    }

    change = async (id:number, email: string, phone: string, altEmail:string, address: string,photo:string, newPassword:string, confNewPassword:string) => {
        for (let i = 0; i < this.userDetails.length; i++) {
            if(this.userDetails[i].id == id) {
                // this.userDetails[i].names = names;
                this.userDetails[i].email = email;
                this.userDetails[i].phone = phone;
                this.userDetails[i].altEmail = altEmail;
                this.userDetails[i].address = address;
                this.userDetails[i].photo = photo;
                this.userDetails[i].newPassword = newPassword;
                this.userDetails[i].confNewPassword = confNewPassword;

            }
        }
        console.log(this.userDetails);
    }
    
}


export default new UserService();


