"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FullTableException_1 = require("../Exceptions/FullTableException");
var Table = /** @class */ (function () {
    function Table(name, playersQty, isProtected, password) {
        if (playersQty === void 0) { playersQty = 2; }
        if (isProtected === void 0) { isProtected = false; }
        this._name = name;
        this._playersQty = playersQty;
        this._isProtected = isProtected;
        this._password = password;
        this._players = [];
        this._awaitingPlayers = [];
        this._id = (Math.random() * 10000).toString().split(".")[0];
    }
    Table.prototype.addPlayer = function (player) {
        if (this._players.length >= this._playersQty) {
            throw new FullTableException_1.default("Full table");
        }
        this._awaitingPlayers.push(player);
    };
    Table.prototype.connectPlayer = function (player) {
        var nickname = player.nickname;
        var awaitingPlayer = this._awaitingPlayers.find(function (player) { return player.nickname === nickname; });
        if (!awaitingPlayer) {
            throw new Error(); //FIXME: manejar caso borde
        }
        this._awaitingPlayers = this._awaitingPlayers.filter(function (player) { return player.nickname !== nickname; }); //Sacarlo de la lista de awaiting players
        this._players.push(player);
    };
    Object.defineProperty(Table.prototype, "id", {
        /**
         * Getter id
         * @return {string}
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "name", {
        /**
         * Getter name
         * @return {string}
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "isProtected", {
        /**
         * Getter isProtected
         * @return {boolean}
         */
        get: function () {
            return this._isProtected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "password", {
        /**
         * Getter password
         * @return {string}
         */
        get: function () {
            return this._password;
        },
        enumerable: true,
        configurable: true
    });
    return Table;
}());
exports.default = Table;
//# sourceMappingURL=Table.js.map