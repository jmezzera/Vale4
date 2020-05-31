import * as http from "http";
import * as socketIo from "socket.io";
import TablesSessions from "./TablesSessions";
import User from "../../Entities/User";
import TablesController from "../../UseCases/TablesController";
import UserController from "../../UseCases/UserController";
import EventEmitter from "./EventEmitter";
import Table from "../../Entities/Table";
import Card from "../../Entities/Card";

//TODO: tipar eventos

export default class SocketHandler implements TablesSessions, EventEmitter {
    private io: socketIo.Server;
    private tablesController: TablesController;
    private userController: UserController;
    private tables: Map<string, socketIo.Namespace>;
    private clients: Map<string, socketIo.Socket[]>;
    constructor(
        server: http.Server,
        tablesController: TablesController,
        userController: UserController
    ) {
        this.io = socketIo(server);
        this.tables = new Map<string, socketIo.Namespace>();
        this.clients = new Map<string, socketIo.Socket[]>();
        this.tablesController = tablesController;
        this.userController = userController;

        this.createTable = this.createTable.bind(this);
    }

    public createTable = (id: string): void => {
        if (this.tables.has(id)) {
            throw new Error("Mesa ya existe");
        }
        const tableNamespace = this.io.of(id);
        this.tables.set(id, tableNamespace);
        tableNamespace.on("connect", socket => {
            console.log("Conectado a " + id);
            socket.on("discover", async (data: string) => {
                let parsedData: { username: string; token: string } = JSON.parse(data);
                let user: User;
                try {
                    user = await this.userController.validateToken(parsedData.token);

                    if (user.nickname === parsedData.username) {
                        this.tablesController.playerConnected(id, user);
                        if (this.clients.get(id)) {
                            this.clients.get(id).push(socket);
                        } else {
                            this.clients.set(id, [socket]);
                        }
                    } else {
                        socket.emit("Forbidden");
                        socket.disconnect();
                    }
                } catch (err) {
                    socket.emit("Forbidden");
                    socket.disconnect();
                }
            });
        });
    };

    public dealCards = (table: Table, cards: { hands: [Card, Card, Card][]; sampleCard: Card }) => {
        let clientsOfTable = this.clients.get(table.id);
        for (let index = 0; index < table.playersQty; index++) {
            clientsOfTable[index].emit("cards", {
                cards: cards.hands[index],
                sampleCard: cards.sampleCard,
            });
        }
    };
}
