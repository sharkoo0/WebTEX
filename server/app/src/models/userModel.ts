export interface User {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    photoPath: string;
    altEmail: string;
    birthdate: string;
    phone: string;
}

export interface userDetails {
    id: number;
    username: string;
    names:string;
    email: string;
    altEmail: string;
    phone: string;
    address: string;
    photo: string;
    newPassword: string;
    confNewPassword: string;
}