import User from "../Entities/User";
import LoggedUser from "../Entities/LoggedUser";

export default interface UserController {
	login(user: User): Promise<LoggedUser>;
	registry(user: User): Promise<LoggedUser>;
}
