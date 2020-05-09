"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationUtilies = /** @class */ (function () {
    function ValidationUtilies() {
        this.isEmpty = function (value) {
            var validation = value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0);
            return validation;
        };
    }
    return ValidationUtilies;
}());
exports.default = ValidationUtilies;
//# sourceMappingURL=ValidationUtilities.js.map