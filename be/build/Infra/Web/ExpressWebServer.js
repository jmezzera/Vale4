"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var http = require("http");
var StatusAPI_1 = require("./StatusAPI");
var TablesAPI_1 = require("./TablesAPI");
var ExpressWebServer = /** @class */ (function () {
    function ExpressWebServer(controllers) {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this._server = http.createServer(this.app);
        //this.socketHandler = new SocketHandler(this.server);
        this.statusAPI = new StatusAPI_1.default();
        this.app.use("/status", this.statusAPI.router);
        this.tablesAPI = new TablesAPI_1.default(controllers.tablesController);
        this.app.use("/tables", this.tablesAPI.router);
    }
    ExpressWebServer.prototype.listen = function (port) {
        this.server.listen(port, function () {
            console.log("Express server running on port " + port);
        });
    };
    Object.defineProperty(ExpressWebServer.prototype, "server", {
        get: function () {
            return this._server;
        },
        enumerable: true,
        configurable: true
    });
    return ExpressWebServer;
}());
exports.default = ExpressWebServer;
//# sourceMappingURL=ExpressWebServer.js.map