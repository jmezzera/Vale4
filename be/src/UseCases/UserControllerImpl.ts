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
		return this._usersDB.findUserToLogin(
			user.nickname,
			user.email,
			user.password
		);
	}
	registry(user: User): Promise<LoggedUser> {
		throw new Error("Method not implemented.");
	}
}
