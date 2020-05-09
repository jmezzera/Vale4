import WebServer from "./Infra/Web/WebServer";
import ExpressWebServer from "./Infra/Web/ExpressWebServer";
import TablesController from "./UsesCases/TablesController";
import TablesControllerImpl from "./UsesCases/TablesControllerImpl";
import TablesDBDummy from "./Infra/DB/TablesDBDummy";
import TablesDB from "./Infra/DB/TablesDB";
import TablesSessions from "./Infra/Web/TablesSessions";
import SocketHandler from "./Infra/Web/SocketHandler";
export default class Server {
    private webServer: WebServer;
    private tablesController: TablesController;
    private tablesSessionController: TablesSessions;
    private tablesDB: TablesDB;
    constructor() {
        this.tablesDB = new TablesDBDummy();
        this.tablesController = new TablesControllerImpl(this.tablesDB);
        this.webServer = new ExpressWebServer({
            tablesController: this.tablesController,
        });
        this.tablesSessionController = new SocketHandler(
            this.webServer.server,
            this.tablesController
        );
        this.tablesController.tablesSessionController = this.tablesSessionController;
    }
    public run() {
        this.webServer.listen(8080);
    }
}
