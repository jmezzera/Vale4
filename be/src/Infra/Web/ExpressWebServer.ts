import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import * as mongoose from "mongoose";

import WebServer from "./WebServer";
import SocketHandler from "./SocketHandler";
import UserController from "../../UseCases/UserController";
import * as keys from "../../../config/key";

import StatusAPI from "./StatusAPI";
import UsersAPI from "./UsersAPI";
import TablesAPI from "./TablesAPI";
import TablesController from "../../UseCases/TablesController";
import { GameController } from "../../UseCases/GameController";

export default class ExpressWebServer implements WebServer {
	private _server: http.Server;
	private app: express.Application;
	private socketHandler: SocketHandler;
	private usersAPI: UsersAPI;
	private statusAPI: StatusAPI;
	private tablesAPI: TablesAPI;

	constructor(controllers: {
		tablesController: TablesController;
		usersController: UserController;
		gameController: GameController;
	}) {
		this.app = express();

		this._server = http.createServer(this.app);

		//this.socketHandler = new SocketHandler(this.server);

		this.app.use(cors());
		this.app.use(express.json());

		this.usersAPI = new UsersAPI(controllers.usersController);
		this.app.use("/users", this.usersAPI.router);

		this.statusAPI = new StatusAPI();
		this.app.use("/status", this.statusAPI.router);

		this.tablesAPI = new TablesAPI(controllers.tablesController);
		this.app.use("/tables", this.tablesAPI.router);

		this.socketHandler = new SocketHandler(
			this._server,
			controllers.tablesController,
			controllers.gameController
		);

		this.statusAPI = new StatusAPI();
		this.connectToTheDatabase();
	}

	public get server(): http.Server {
		return this._server;
	}

	private connectToTheDatabase() {
		//const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
		const db = keys.mongoURI;
		mongoose
			.connect(db)
			.then(() => console.log("MongoDB connect succesful"))
			.catch((err) => console.log(err));
	}
	public listen(port: number) {
		this.server.listen(port, () => {
			console.log(`Express server running on port ${port}`);
		});
	}
}
