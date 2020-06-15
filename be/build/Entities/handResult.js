"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HandResult = /** @class */ (function () {
    function HandResult(shiftUser, shuffledUser, needShuffle) {
        this._shiftUser = shiftUser;
        this._shuffledUser = shuffledUser;
        this._needShuffle = needShuffle;
    }
    Object.defineProperty(HandResult.prototype, "shuffledUser", {
        /**
         * Getter _shuffledUser
         * @return {User}
         */
        get: function () {
            return this._shuffledUser;
        },
        /**
         * Setter _shuffledUser
         * @return {User}
         */
        set: function (value) {
            this._shuffledUser = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HandResult.prototype, "needShuffle", {
        /**
         * Getter needShuffle
         * @return {boolean}
         */
        get: function () {
            return this._needShuffle;
        },
        /**
         * Setter needShuffle
         * @return {boolean}
         */
        set: function (value) {
            this._needShuffle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HandResult.prototype, "shiftUser", {
        /**
         * Getter shiftUser
         * @return {User}
         */
        get: function () {
            return this._shiftUser;
        },
        /**
         * Setter shiftUser
         * @return {User}
         */
        set: function (value) {
            this._shiftUser = value;
        },
        enumerable: true,
        configurable: true
    });
    return HandResult;
}());
exports.default = HandResult;
//# sourceMappingURL=HandResult.js.map