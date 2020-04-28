"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("validator.ts/Validator");
var RegisterValidator = /** @class */ (function () {
    function RegisterValidator() {
        var _this = this;
        this.isEmpty = function (value) {
            var validation = value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0);
            return validation;
        };
        this.validateRegisterInput = function (user) {
            var errors = {
                name: "",
                surname: "",
                email: "",
                nickname: "",
                password: "",
                confirmPassword: "",
            };
            user.name = !_this.isEmpty(user.name) ? user.name : "";
            user.email = !_this.isEmpty(user.email) ? user.email : "";
            user.password = !_this.isEmpty(user.password) ? user.password : "";
            user.confirmPassword = !_this.isEmpty(user.confirmPassword)
                ? user.confirmPassword
                : "";
            if (_this.validator.isLength(user.name, 2, 20)) {
                errors.name = "Name must be between 2 and 20 characters";
            }
            /*if (this.validator.isEmail(user.email)) {
                errors.email = "Email field is required";
            }*/
            if (_this.isEmpty(user.name)) {
                errors.name = "Name field is required";
            }
            if (_this.isEmpty(user.password)) {
                errors.password = "Passowrd field is required";
            }
            if (!_this.validator.isLength(user.password, 6, 30)) {
                errors.password =
                    "passowrd must be at least 6 characters and no more than 30.";
            }
            if (_this.isEmpty(user.confirmPassword)) {
                errors.confirmPassword = "Confirm passowrd field is required";
            }
            if (!_this.validator.equals(user.password, user.confirmPassword)) {
                errors.confirmPassword = "Passowrd must match";
            }
            return {
                errors: errors,
                isValid: _this.isEmpty(errors),
            };
        };
        this.validator = new Validator_1.Validator();
    }
    return RegisterValidator;
}());
exports.default = RegisterValidator;
//# sourceMappingURL=RegisterValidator.js.map