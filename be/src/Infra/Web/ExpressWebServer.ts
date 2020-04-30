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

export default class ExpressWebServer implements WebServer {
	private server: http.Server;
	private app: express.Application;
	private socketHandler: SocketHandler;
	private statusAPI: StatusAPI;
	private usersAPI: UsersAPI;
	private usersController: UserController;

	constructor(usersController: UserController) {
		this.app = express();

		this.server = http.createServer(this.app);

		this.socketHandler = new SocketHandler(this.server);
		this.usersController = usersController;

		this.usersAPI = new UsersAPI(this.usersController);
		this.statusAPI = new StatusAPI();
		this.connectToTheDatabase();

		this.app.use(cors());
		this.app.use(express.json());
		this.app.use("/status", this.statusAPI.router);
		this.app.use("/users", this.usersAPI.router);
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
