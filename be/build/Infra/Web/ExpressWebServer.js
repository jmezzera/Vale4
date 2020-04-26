"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var http = require("http");
var SocketHandler_1 = require("./SocketHandler");
var StatusAPI_1 = require("./StatusAPI");
var ExpressWebServer = /** @class */ (function () {
    function ExpressWebServer() {
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());
        this.server = http.createServer(this.app);
        this.socketHandler = new SocketHandler_1.default(this.server);
        this.statusAPI = new StatusAPI_1.default();
        this.app.use("/status", this.statusAPI.router);
    }
    ExpressWebServer.prototype.listen = function (port) {
        this.server.listen(port, function () {
            console.log("Express server running on port " + port);
        });
    };
    return ExpressWebServer;
}());
exports.default = ExpressWebServer;
//# sourceMappingURL=ExpressWebServer.js.map