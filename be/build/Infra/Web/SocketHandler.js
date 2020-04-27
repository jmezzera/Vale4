"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var SocketHandler = /** @class */ (function () {
    function SocketHandler(server) {
        var io = socketIo(server);
        io.on("connect", function (socket) { });
    }
    return SocketHandler;
}());
exports.default = SocketHandler;
//# sourceMappingURL=SocketHandler.js.map