"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserControllerImpl = /** @class */ (function () {
    function UserControllerImpl(usersDB) {
        this._usersDB = usersDB;
    }
    UserControllerImpl.prototype.login = function (user) {
        console.log(user);
        return this._usersDB.findUserToLogin(user.nickname, user.email, user.password);
    };
    UserControllerImpl.prototype.registry = function (user) {
        throw new Error("Method not implemented.");
    };
    return UserControllerImpl;
}());
exports.default = UserControllerImpl;
//# sourceMappingURL=UserControllerImpl.js.map