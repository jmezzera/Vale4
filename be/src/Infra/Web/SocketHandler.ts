import * as http from "http";
import * as socketIo from "socket.io";
import TablesSessions from "./TablesSessions";
import User from "../../Entities/User";
import TablesController from "../../UseCases/TablesController";
import Card from "../../Entities/Card";
import { cambioTurno } from "./SocketUtilities";
import { GameController } from "../../UseCases/GameController";

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
			socket.on("playCard", (data: Card) => {
				this.io.sockets.to(id).emit("cartaJugada", data);
				let deleteCardsOnTable = this.gameController.takeGameDecision(
					data,
					id
				);
				if (deleteCardsOnTable) {
					this.io.sockets.emit("deleteCards", null);
				}
			});
		});
	}
}
