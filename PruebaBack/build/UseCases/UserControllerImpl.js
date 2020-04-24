"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserControllerImpl = /** @class */ (function () {
    function UserControllerImpl(usersDB) {
        this._usersDB = usersDB;
    }
    UserControllerImpl.prototype.getUsers = function () {
        return this._usersDB.getUsers();
    };
    UserControllerImpl.prototype.addUser = function (user) {
        return this._usersDB.addUser(user);
    };
    UserControllerImpl.prototype.validateToken = function (token) {
        throw new Error("Method not implemented.");
    };
    return UserControllerImpl;
}());
exports.default = UserControllerImpl;
//# sourceMappingURL=UserControllerImpl.js.map