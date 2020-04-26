import WebServer from "./Infra/Web/WebServer";
import ExpressWebServer from "./Infra/Web/ExpressWebServer";

export default class Server {
    private webServer: WebServer;
    constructor() {
        this.webServer = new ExpressWebServer();
    }
    public run() {
        this.webServer.listen(8080);
    }
}
