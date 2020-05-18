import * as http from "http";
import * as socketIo from "socket.io";
import TablesSessions from "./TablesSessions";
import User from "../../Entities/User";
import TablesController from "../../UseCases/TablesController";
import UserController from "../../UseCases/UserController";

//TODO: tipar eventos

export default class SocketHandler implements TablesSessions {
    private io: socketIo.Server;
    private tablesController: TablesController;
    private userController: UserController;
    private tables: Map<string, socketIo.Namespace>;
    constructor(
        server: http.Server,
        tablesController: TablesController,
        userController: UserController
    ) {
        this.io = socketIo(server);
        this.tables = new Map<string, socketIo.Namespace>();
        this.tablesController = tablesController;
        this.userController = userController;
        console.trace();
        console.log("constructor", userController);

        this.createTable = this.createTable.bind(this);
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

                let parsedData: { username: string; token: string } = JSON.parse(data);
                let user: User;
                try {
                    user = await this.userController.validateToken(parsedData.token);
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
        });
    }
}
