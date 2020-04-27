import UsersDB from "./UsersDB";
import LoggedUser from "../../../Entities/LoggedUser";
import User from "../../../Entities/User";

export default class UserDBImpl implements UsersDB {
	private users = {
		user1: {
			nickname: "Pepe",
			password: "1234",
			email: "pepeBienSuelto@gmail.com",
		},
	};
	findUserToLogin(nickname, email, password): Promise<LoggedUser> {
		if (
			(this.users.user1.nickname == nickname ||
				this.users.user1.email == email) &&
			this.users.user1.password == password
		) {
			let token = "1234";
			return Promise.resolve(new LoggedUser(nickname, email, token));
		}
		return null;
	}
	addUser(user: User): Promise<string> {
		throw new Error("Method not implemented.");
	}
}
