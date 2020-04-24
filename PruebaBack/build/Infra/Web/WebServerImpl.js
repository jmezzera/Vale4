"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var UsersAPI_1 = require("./UsersAPI");
var WebServerImpl = /** @class */ (function () {
    function WebServerImpl(usersController) {
        this.app = express();
        this.usersController = usersController;
        this.usersAPI = new UsersAPI_1.default(this.usersController);
        this.app.use(express.json());
        this.app.use('/users', this.usersAPI.router);
    }
    WebServerImpl.prototype.listen = function (port) {
        this.app.listen(port);
    };
    return WebServerImpl;
}());
exports.default = WebServerImpl;
//# sourceMappingURL=WebServerImpl.js.map