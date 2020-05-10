"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./User");
var LoggedUser = /** @class */ (function (_super) {
    __extends(LoggedUser, _super);
    function LoggedUser(nickname, email, token) {
        var _this = _super.call(this, nickname, email) || this;
        _this._token = token;
        return _this;
    }
    Object.defineProperty(LoggedUser.prototype, "token", {
        /**
         * Getter token
         * @return {string}
         */
        get: function () {
            return this._token;
        },
        /**
         * Setter token
         * @param {string} value
         */
        set: function (value) {
            this._token = value;
        },
        enumerable: true,
        configurable: true
    });
    return LoggedUser;
}(User_1.default));
exports.default = LoggedUser;
//# sourceMappingURL=LoggedUser.js.map