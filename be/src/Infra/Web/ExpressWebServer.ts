import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import WebServer from "./WebServer";
import SocketHandler from "./SocketHandler";
import StatusAPI from "./StatusAPI";

export default class ExpressWebServer implements WebServer {
    private server: http.Server;
    private app: express.Application;
    private socketHandler: SocketHandler;
    private statusAPI: StatusAPI;

    constructor() {
        this.app = express();

        this.app.use(cors());
        this.app.use(express.json());

        this.server = http.createServer(this.app);

        this.socketHandler = new SocketHandler(this.server);

        this.statusAPI = new StatusAPI();
        this.app.use("/status", this.statusAPI.router);
    }
    public listen(port: number) {
        this.server.listen(port, () => {
            console.log(`Express server running on port ${port}`);
        });
    }
}
