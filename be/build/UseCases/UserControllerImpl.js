"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserControllerImpl = /** @class */ (function () {
    function UserControllerImpl(usersDB) {
        this._usersDB = usersDB;
    }
    UserControllerImpl.prototype.login = function (user) {
        return this._usersDB.findUserToLogin(user);
    };
    UserControllerImpl.prototype.registry = function (user) {
        return this._usersDB.addUser(user);
    };
    UserControllerImpl.prototype.validateToken = function (token) {
        return this._usersDB.validateToken(token);
    };
    return UserControllerImpl;
}());
exports.default = UserControllerImpl;
//# sourceMappingURL=UserControllerImpl.js.map