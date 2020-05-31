"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var http = require("http");
var mongoose = require("mongoose");
var SocketHandler_1 = require("./SocketHandler");
var keys = require("../../../config/key");
var StatusAPI_1 = require("./StatusAPI");
var UsersAPI_1 = require("./UsersAPI");
var TablesAPI_1 = require("./TablesAPI");
var Users_1 = require("./MiddleWare/Users");
var ExpressWebServer = /** @class */ (function () {
    function ExpressWebServer(controllers) {
        this.app = express();
        this._server = http.createServer(this.app);
        //this.socketHandler = new SocketHandler(this.server);
        this.app.use(cors());
        this.app.use(express.json());
        this.usersMiddleWare = new Users_1.default(controllers.usersController);
        this.usersAPI = new UsersAPI_1.default(controllers.usersController);
        this.app.use("/users", this.usersAPI.router);
        this.statusAPI = new StatusAPI_1.default();
        this.app.use("/status", this.statusAPI.router);
        this.tablesAPI = new TablesAPI_1.default(controllers.tablesController, this.usersMiddleWare);
        this.app.use("/tables", this.tablesAPI.router);
        this.socketHandler = new SocketHandler_1.default(this._server, controllers.tablesController, controllers.gameController, controllers.usersController);
        this.statusAPI = new StatusAPI_1.default();
        this.connectToTheDatabase();
    }
    Object.defineProperty(ExpressWebServer.prototype, "server", {
        get: function () {
            return this._server;
        },
        enumerable: true,
        configurable: true
    });
    ExpressWebServer.prototype.connectToTheDatabase = function () {
        //const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        var db = keys.mongoURI;
        mongoose
            .connect(db)
            .then(function () { return console.log("MongoDB connect succesful"); })
            .catch(function (err) { return console.log(err); });
    };
    ExpressWebServer.prototype.listen = function (port) {
        this.server.listen(port, function () {
            console.log("Express server running on port " + port);
        });
    };
    return ExpressWebServer;
}());
exports.default = ExpressWebServer;
//# sourceMappingURL=ExpressWebServer.js.map