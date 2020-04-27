"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressWebServer_1 = require("./Infra/Web/ExpressWebServer");
var UserControllerImpl_1 = require("./UseCases/UserControllerImpl");
var UsersDBImpl_1 = require("./Infra/DB/Users/UsersDBImpl");
var Server = /** @class */ (function () {
    function Server() {
        this.userDB = new UsersDBImpl_1.default();
        this.usersController = new UserControllerImpl_1.default(this.userDB);
        this.webServer = new ExpressWebServer_1.default(this.usersController);
    }
    Server.prototype.run = function () {
        this.webServer.listen(8080);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=Server.js.map