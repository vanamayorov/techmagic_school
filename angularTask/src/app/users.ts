export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
}

export interface IUser extends User {
    checked: boolean;
}

export const users: User[] = [
    {
        id: 1,
        firstname: "Leanne",
        lastname: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
    },
    {
        id: 2,
        firstname: "Mike",
        lastname: "Tyson",
        email: "Tyson@june.biz",
        phone: "1-327-436-83231 x56442",
    },
    {
        id: 3,
        firstname: "Anthony",
        lastname: "Joshua",
        email: "Joshua@april.biz",
        phone: "1-770-736-8031 123",
    }
];