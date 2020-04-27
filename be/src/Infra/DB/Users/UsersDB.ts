import LoggedUser from "../../../Entities/LoggedUser";
import User from "../../../Entities/User";

export default interface UsersDB {
	findUserToLogin(nickname, email, password): Promise<LoggedUser>;
	addUser(user: User): Promise<string>;
}
