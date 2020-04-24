"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var User_1 = require("../../Entities/User");
var UsersAPI = /** @class */ (function () {
    function UsersAPI(usersController) {
        var _this = this;
        this.addUser = function (req, res) {
            var name = req.body.name;
            if (!name) {
                res.status(400).send("Falta el nombre");
                return;
            }
            _this.usersController.addUser(new User_1.default(name))
                .then(function (id) { return res.status(201).send(id); });
        };
        this.getUsers = function (req, res) {
            _this.usersController.getUsers()
                .then(function (users) { return res.status(200).send(users); });
        };
        this.usersController = usersController;
        this._router = express.Router();
        this.initRoutes();
    }
    UsersAPI.prototype.initRoutes = function () {
        this._router.get('/', this.getUsers);
        this._router.post('/', this.addUser);
    };
    Object.defineProperty(UsersAPI.prototype, "router", {
        get: function () {
            return this._router;
        },
        enumerable: true,
        configurable: true
    });
    return UsersAPI;
}());
exports.default = UsersAPI;
//# sourceMappingURL=UsersAPI.js.map