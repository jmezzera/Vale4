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
    return UserControllerImpl;
}());
exports.default = UserControllerImpl;
//# sourceMappingURL=UserControllerImpl.js.map