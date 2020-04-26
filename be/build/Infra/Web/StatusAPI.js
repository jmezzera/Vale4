"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var StatusAPI = /** @class */ (function () {
    function StatusAPI() {
        this._router = express.Router();
        this.initializeRoutes();
    }
    StatusAPI.prototype.initializeRoutes = function () {
        this._router.get("/up", this.uptime);
    };
    StatusAPI.prototype.uptime = function (req, res) {
        console.log(process.uptime().toString());
        res.status(200).send({
            uptime: process.uptime(),
        });
    };
    Object.defineProperty(StatusAPI.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    return StatusAPI;
}());
exports.default = StatusAPI;
//# sourceMappingURL=StatusAPI.js.map