import UserController from "./UserController";
import User from "../Entities/User";
import UsersDB from "../Infra/DB/Users/UsersDB";

export default class UserControllerImpl implements UserController{
    private _usersDB: UsersDB;
    constructor(usersDB: UsersDB){
        this._usersDB = usersDB;
    }
    getUsers(): Promise<User[]> {
        return this._usersDB.getUsers()
    }
    addUser(user: User): Promise<string> {
        return this._usersDB.addUser(user);
    }
    validateToken(token: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

}