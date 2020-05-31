import UserController from "./UserController";
import User from "../Entities/User";
import LoggedUser from "../Entities/LoggedUser";
import UsersDB from "../Infra/DB/Users/UsersDB";

export default class UserControllerImpl implements UserController {
    private _usersDB: UsersDB;
    constructor(usersDB: UsersDB) {
        this._usersDB = usersDB;
    }
    login(user: User): Promise<LoggedUser> {
        return this._usersDB.findUserToLogin(user);
    }
    registry(user: User): Promise<LoggedUser> {
        return this._usersDB.addUser(user);
    }
    validateToken(token: string): Promise<User> {
        return this._usersDB.validateToken(token);
    }
}
