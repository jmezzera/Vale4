import WebServer from "./Infra/Web/WebServer";
import ExpressWebServer from "./Infra/Web/ExpressWebServer";
import UserController from "./UseCases/UserController";
import UserControllerImpl from "./UseCases/UserControllerImpl";
import UsersDB from "./Infra/DB/Users/UsersDB";
import UserDBImpl from "./Infra/DB/Users/UsersDBImpl";
import TablesController from "./UseCases/TablesController";
import TablesControllerImpl from "./UseCases/TablesControllerImpl";
import TablesDBDummy from "./Infra/DB/TablesDBDummy";
import TablesDB from "./Infra/DB/TablesDB";
import TablesSessions from "./Infra/Web/TablesSessions";
import SocketHandler from "./Infra/Web/SocketHandler";
import GameController from "./UseCases/GameController";
import GameControllerImpl from "./UseCases/GameControllerImpl";
import EventEmitter from "./Infra/Web/EventEmitter";

export default class Server {
	private webServer: WebServer;
	private usersController: UserController;
	private userDB: UsersDB;
	private tablesController: TablesController;
	private tablesSessionController: TablesSessions & EventEmitter;
	private tablesDB: TablesDB;
	private gameController: GameController;

	constructor() {
		this.userDB = new UserDBImpl();
		this.usersController = new UserControllerImpl(this.userDB);
		this.tablesDB = new TablesDBDummy();
		this.gameController = new GameControllerImpl();
		this.tablesController = new TablesControllerImpl(
			this.tablesDB,
			this.gameController
		);
		this.webServer = new ExpressWebServer({
			tablesController: this.tablesController,
			gameController: this.gameController,
			usersController: this.usersController,
		});

		this.tablesSessionController = new SocketHandler(
			this.webServer.server,
			this.tablesController,
			this.gameController,
			this.usersController
		);
		this.tablesController.tablesSessionController = this.tablesSessionController;
		this.gameController.tablesConnection = this.tablesSessionController;
	}
	public run() {
		this.webServer.listen(8080);
	}
}
