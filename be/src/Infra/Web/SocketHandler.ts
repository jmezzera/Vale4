import * as http from "http";
import * as socketIo from "socket.io";
import TablesSessions from "./TablesSessions";
import User from "../../Entities/User";
import TablesController from "../../UseCases/TablesController";
import Card, { Suit } from "../../Entities/Card";
import GameController from "../../UseCases/GameController";
import MissingDataException from "../../Exceptions/MissingDataException";
import UserController from "../../UseCases/UserController";

//TODO: tipar eventos

export default class SocketHandler implements TablesSessions {
	private io: socketIo.Server;
	private tablesController: TablesController;
	private tables: Map<string, socketIo.Namespace>;
	private gameController: GameController;
	private userController: UserController;

	constructor(
		server: http.Server,
		tablesController: TablesController,
		gameController: GameController,
		userController: UserController
	) {
		this.io = socketIo(server);
		this.tables = new Map<string, socketIo.Namespace>();
		this.tablesController = tablesController;
		this.userController = userController;
		this.gameController = gameController;

		this.createTable = this.createTable.bind(this);
		console.trace();
	}

	public createTable(id: string): void {
		if (this.tables.has(id)) {
			throw new Error("Mesa ya existe");
		}
		const tableNamespace = this.io.of(id);
		this.tables.set(id, tableNamespace);
		tableNamespace.on("connect", socket => {
			console.log("Conectado a " + id);
			socket.on("discover", async (data: string) => {
				console.log(this);
				console.log(this.userController);

				let parsedData: {
					username: string;
					token: string;
				} = JSON.parse(data);
				let user: User;
				try {
					user = await this.userController.validateToken(
						parsedData.token
					);
					console.log(user);

					if (user.nickname === parsedData.username)
						this.tablesController.playerConnected(id, user);
					else {
						socket.emit("Forbidden");
						socket.disconnect();
					}
				} catch (err) {
					socket.emit("Forbidden");
					socket.disconnect();
				}
			});

			socket.on("playCard", async (data: string) => {
				let parsedData: {
					suit: string;
					number: number;
					nickname: string;
					email: string;
				} = JSON.parse(data);
				let card: Card;
				switch (parsedData.suit) {
					case "Oro":
						card = new Card(Suit.Oro, parsedData.number);
						break;
					case "Basto":
						card = new Card(Suit.Basto, parsedData.number);
						break;
					case "Espada":
						card = new Card(Suit.Espada, parsedData.number);
						break;
					case "Copa":
						card = new Card(Suit.Copa, parsedData.number);
						break;
					default:
						throw new MissingDataException(
							"Suit parameter is missing."
						);
				}
				this.io.sockets.to(id).emit("cartaJugada", card);
				let deleteCardsOnTable = this.gameController.takeGameDecision(
					card,
					id,
					new User(parsedData.nickname, parsedData.email)
				);
				if (deleteCardsOnTable) {
					this.io.sockets.emit("deleteCards", null);
				}
			});
		});
	}
}
