import User from "../Entities/User";

export default interface UserController{
    getUsers(): Promise<User[]>;
    addUser(user: User): Promise<string>;
    validateToken(token: string): Promise<User>;
}