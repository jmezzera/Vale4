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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(user) {
        var _this = _super.call(this, user.nickname, user.email, user.password, user.confirmPassword, user.name, user.surname) || this;
        _this._cards = [];
        return _this;
    }
    Player.prototype.dealCards = function (cards) {
        this._cards = cards;
    };
    Object.defineProperty(Player.prototype, "cards", {
        get: function () {
            return this._cards;
        },
        set: function (value) {
            this._cards = value;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}(User_1.default));
exports.default = Player;
//# sourceMappingURL=Player.js.map