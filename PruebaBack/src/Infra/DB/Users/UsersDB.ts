import User from "../../../Entities/User";

export default interface UsersDB{
    getUsers(): Promise<User[]>;
    addUser(user: User): Promise<string>;
}