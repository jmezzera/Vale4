"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var User_1 = require("../../Entities/User");
var UsersAPI = /** @class */ (function () {
    function UsersAPI(usersController) {
        var _this = this;
        this.login = function (req, res) {
            var user = new User_1.default(req.body.nickname, req.body.email, req.body.password, req.body.name, req.body.surname);
            _this.usersController.login(user).then(function (loggedUser) {
                res.status(200).send(loggedUser);
            });
        };
        this.usersController = usersController;
        this._router = express.Router();
        this.initializeRoutes();
    }
    UsersAPI.prototype.initializeRoutes = function () {
        this._router.get("/login", this.login);
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