"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressWebServer_1 = require("./Infra/Web/ExpressWebServer");
var Server = /** @class */ (function () {
    function Server() {
        this.webServer = new ExpressWebServer_1.default();
    }
    Server.prototype.run = function () {
        this.webServer.listen(8080);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=Server.js.map