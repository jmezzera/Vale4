import UsersDB from "./UsersDB";
import User from "../../../Entities/User";

export default class UserDBDummy implements UsersDB{
    private users = [new User("JK"), new User("Faja")];
    public getUsers(): Promise<User[]>{
        return Promise.resolve(this.users);
    }
    public addUser(user: User): Promise<string>{
        this.users.push(user);
        return Promise.resolve("id");
    }
}