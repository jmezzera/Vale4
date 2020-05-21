import * as http from "http";
import * as socketIo from "socket.io";
import TablesSessions from "./TablesSessions";
import User from "../../Entities/User";
import TablesController from "../../UseCases/TablesController";
import Card, { Suit } from "../../Entities/Card";
import GameController from "../../UseCases/GameController";
import MissingDataException from "../../Exceptions/MissingDataException";

//TODO: tipar eventos

export default class SocketHandler implements TablesSessions {
	private io: socketIo.Server;
	private tablesController: TablesController;
	private tables: Map<string, socketIo.Namespace>;
	private gameController: GameController;
	constructor(
		server: http.Server,
		tablesController: TablesController,
		gameController: GameController
	) {
		this.io = socketIo(server);
		this.tables = new Map<string, socketIo.Namespace>();
		this.tablesController = tablesController;
		this.gameController = gameController;
	}

	public createTable(id: string): void {
		if (this.tables.has(id)) {
			throw new Error("Mesa ya existe");
		}
		const tableNamespace = this.io.of(id);
		this.tables.set(id, tableNamespace);
		tableNamespace.on("connect", (socket) => {
			console.log("Conectado a " + id);
			socket.on("discover", async (data: string) => {
				let parsedData: {
					username: string;
					token: string;
				} = JSON.parse(data);

				let user: User = new User(
					parsedData.username,
					parsedData.username
				); // Habria que validarlo con el controlador de usuarios
				if (!user) {
					socket.disconnect();
				}
				this.tablesController.playerConnected(id, user);
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
