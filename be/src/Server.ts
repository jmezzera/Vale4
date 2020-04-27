import WebServer from "./Infra/Web/WebServer";
import ExpressWebServer from "./Infra/Web/ExpressWebServer";
import UserController from "./UseCases/UserController";
import UserControllerImpl from "./UseCases/UserControllerImpl";
import UsersDB from "./Infra/DB/Users/UsersDB";
import UserDBImpl from "./Infra/DB/Users/UsersDBImpl";

export default class Server {
	private webServer: WebServer;
	private usersController: UserController;
	private userDB: UsersDB;

	constructor() {
		this.userDB = new UserDBImpl();
		this.usersController = new UserControllerImpl(this.userDB);
		this.webServer = new ExpressWebServer(this.usersController);
	}
	public run() {
		this.webServer.listen(8080);
	}
}
