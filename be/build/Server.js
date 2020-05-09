"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressWebServer_1 = require("./Infra/Web/ExpressWebServer");
var TablesControllerImpl_1 = require("./UsesCases/TablesControllerImpl");
var TablesDBDummy_1 = require("./Infra/DB/TablesDBDummy");
var SocketHandler_1 = require("./Infra/Web/SocketHandler");
var Server = /** @class */ (function () {
    function Server() {
        this.tablesDB = new TablesDBDummy_1.default();
        this.tablesController = new TablesControllerImpl_1.default(this.tablesDB);
        this.webServer = new ExpressWebServer_1.default({
            tablesController: this.tablesController,
        });
        this.tablesSessionController = new SocketHandler_1.default(this.webServer.server, this.tablesController);
        this.tablesController.tablesSessionController = this.tablesSessionController;
    }
    Server.prototype.run = function () {
        this.webServer.listen(8080);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=Server.js.map