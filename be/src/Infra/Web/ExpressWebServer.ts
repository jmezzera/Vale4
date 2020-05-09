import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import WebServer from "./WebServer";
import SocketHandler from "./SocketHandler";
import StatusAPI from "./StatusAPI";
import TablesAPI from "./TablesAPI";
import TablesController from "../../UsesCases/TablesController";

export default class ExpressWebServer implements WebServer {
    private _server: http.Server;
    private app: express.Application;
    private socketHandler: SocketHandler;
    private statusAPI: StatusAPI;
    private tablesAPI: TablesAPI;

    constructor(controllers: { tablesController: TablesController }) {
        this.app = express();

        this.app.use(cors());
        this.app.use(express.json());

        this._server = http.createServer(this.app);

        //this.socketHandler = new SocketHandler(this.server);

        this.statusAPI = new StatusAPI();
        this.app.use("/status", this.statusAPI.router);

        this.tablesAPI = new TablesAPI(controllers.tablesController);
        this.app.use("/tables", this.tablesAPI.router);
    }
    public listen(port: number) {
        this.server.listen(port, () => {
            console.log(`Express server running on port ${port}`);
        });
    }

    public get server(): http.Server {
        return this._server;
    }
}
