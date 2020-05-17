import * as http from "http";
import * as socketIo from "socket.io";
import TablesSessions from "./TablesSessions";
import User from "../../Entities/User";
import TablesController from "../../UseCases/TablesController";

//TODO: tipar eventos

export default class SocketHandler implements TablesSessions {
    private io: socketIo.Server;
    private tablesController: TablesController;
    private tables: Map<string, socketIo.Namespace>;
    constructor(server: http.Server, tablesController: TablesController) {
        this.io = socketIo(server);
        this.tables = new Map<string, socketIo.Namespace>();
        this.tablesController = tablesController;
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
                let parsedData: { username: string; token: string } = JSON.parse(data);

                let user: User = new User(parsedData.username, parsedData.username); // Habria que validarlo con el controlador de usuarios
                if (!user) {
                    socket.disconnect();
                }
                this.tablesController.playerConnected(id, user);
            });
        });
    }
}
