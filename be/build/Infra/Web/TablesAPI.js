"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var User_1 = require("../../Entities/User");
var userDummy = new User_1.default("jk", "jk");
var TablesAPI = /** @class */ (function () {
    function TablesAPI(tablesController) {
        var _this = this;
        this.getTables = function (req, res) {
            _this.tablesController
                .getTables()
                .then(function (tables) { return res.status(200).send(tables); });
        };
        this.createTable = function (req, res) {
            var _a = req.body, name = _a.name, playersQty = _a.playersQty, isProtected = _a.isProtected, password = _a.password;
            _this.tablesController
                .createTable(userDummy, name, playersQty, isProtected, password) //FIXME: Userdummy
                .then(function (table) { return res.status(200).send({ tableId: table.id }); })
                .catch(function (err) { return res.status(500).send(err); });
        };
        this.joinTable = function (req, res) {
            var idTable = req.params.idTable;
            var password = req.body.password;
            _this.tablesController
                .joinTable(idTable, userDummy, password) //FIXME: Userdummy
                .then(function (table) { return res.status(201).send({ tableId: table.id }); });
        };
        this.tablesController = tablesController;
        this._router = express.Router();
        this.initializeRoutes();
    }
    TablesAPI.prototype.initializeRoutes = function () {
        this._router.get("/", this.getTables);
        this._router.post("/", this.createTable);
        this._router.post("/:idTable", this.joinTable);
    };
    Object.defineProperty(TablesAPI.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    return TablesAPI;
}());
exports.default = TablesAPI;
//# sourceMappingURL=TablesAPI.js.map