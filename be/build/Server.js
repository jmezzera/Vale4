"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressWebServer_1 = require("./Infra/Web/ExpressWebServer");
var UserControllerImpl_1 = require("./UseCases/UserControllerImpl");
var UsersDBImpl_1 = require("./Infra/DB/Users/UsersDBImpl");
var TablesControllerImpl_1 = require("./UseCases/TablesControllerImpl");
var TablesDBDummy_1 = require("./Infra/DB/TablesDBDummy");
var SocketHandler_1 = require("./Infra/Web/SocketHandler");
var Server = /** @class */ (function () {
    function Server() {
        this.userDB = new UsersDBImpl_1.default();
        this.usersController = new UserControllerImpl_1.default(this.userDB);
        this.tablesDB = new TablesDBDummy_1.default();
        this.tablesController = new TablesControllerImpl_1.default(this.tablesDB);
        this.webServer = new ExpressWebServer_1.default({
            tablesController: this.tablesController,
            usersController: this.usersController,
        });
        this.tablesSessionController = new SocketHandler_1.default(this.webServer.server, this.tablesController, this.usersController);
        this.tablesController.tablesSessionController = this.tablesSessionController;
    }
    Server.prototype.run = function () {
        this.webServer.listen(8080);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=Server.js.map