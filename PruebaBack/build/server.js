"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebServerImpl_1 = require("./Infra/Web/WebServerImpl");
var UserDBDummy_1 = require("./Infra/DB/Users/UserDBDummy");
var UserControllerImpl_1 = require("./UseCases/UserControllerImpl");
var Server = /** @class */ (function () {
    function Server() {
        this.usersDB = new UserDBDummy_1.default();
        this.userController = new UserControllerImpl_1.default(this.usersDB);
        this.webServer = new WebServerImpl_1.default(this.userController);
    }
    Server.prototype.run = function () {
        this.webServer.listen(8080);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map