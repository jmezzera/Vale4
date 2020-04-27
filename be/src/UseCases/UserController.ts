import User from "../Entities/User";

export default class UserController {
    login(user: User): Promise<LoggedUser>,
    registry(user: User): Promies<LoggedUser>
}
