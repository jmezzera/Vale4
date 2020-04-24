"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../../Entities/User");
var UserDBDummy = /** @class */ (function () {
    function UserDBDummy() {
        this.users = [new User_1.default("JK"), new User_1.default("Faja")];
    }
    UserDBDummy.prototype.getUsers = function () {
        return Promise.resolve(this.users);
    };
    UserDBDummy.prototype.addUser = function (user) {
        this.users.push(user);
        return Promise.resolve("id");
    };
    return UserDBDummy;
}());
exports.default = UserDBDummy;
//# sourceMappingURL=UserDBDummy.js.map