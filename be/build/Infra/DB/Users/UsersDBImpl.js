"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggedUser_1 = require("../../../Entities/LoggedUser");
var UserDBImpl = /** @class */ (function () {
    function UserDBImpl() {
        this.users = {
            user1: {
                nickname: "Pepe",
                password: "1234",
                email: "pepeBienSuelto@gmail.com",
            },
        };
    }
    UserDBImpl.prototype.findUserToLogin = function (nickname, email, password) {
        if ((this.users.user1.nickname == nickname ||
            this.users.user1.email == email) &&
            this.users.user1.password == password) {
            var token = "1234";
            return Promise.resolve(new LoggedUser_1.default(nickname, email, token));
        }
        return null;
    };
    UserDBImpl.prototype.addUser = function (user) {
        throw new Error("Method not implemented.");
    };
    return UserDBImpl;
}());
exports.default = UserDBImpl;
//# sourceMappingURL=UsersDBImpl.js.map