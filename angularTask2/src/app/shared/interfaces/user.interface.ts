export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface ICurrentUser extends IUser {
    firstName: string;
    lastName: string;
}