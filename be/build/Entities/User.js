"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(nickname, email, password, name, surname) {
        this._nickname = nickname;
        this._email = email;
        this._password = password;
        this._name = name;
        this._surname = surname;
    }
    Object.defineProperty(User.prototype, "name", {
        /**
         * Getter name
         * @return {string}
         */
        get: function () {
            return this._name;
        },
        /**
         * Setter name
         * @param {string} value
         */
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "surname", {
        /**
         * Getter surname
         * @return {string}
         */
        get: function () {
            return this._surname;
        },
        /**
         * Setter surname
         * @param {string} value
         */
        set: function (value) {
            this._surname = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "nickname", {
        /**
         * Getter nickname
         * @return {string}
         */
        get: function () {
            return this._nickname;
        },
        /**
         * Setter nickname
         * @param {string} value
         */
        set: function (value) {
            this._nickname = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        /**
         * Getter email
         * @return {string}
         */
        get: function () {
            return this._email;
        },
        /**
         * Setter email
         * @param {string} value
         */
        set: function (value) {
            this._email = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        /**
         * Getter password
         * @return {string}
         */
        get: function () {
            return this._password;
        },
        /**
         * Setter password
         * @param {string} value
         */
        set: function (value) {
            this._password = value;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map