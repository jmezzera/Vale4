import LoggedUser from "../../../Entities/LoggedUser";
import User from "../../../Entities/User";

export default interface UsersDB {
	findUserToLogin(user: User): Promise<LoggedUser>;
	addUser(user: User): Promise<LoggedUser>;
}
