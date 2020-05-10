"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Register = /** @class */ (function () {
    function Register() {
        var _this = this;
        this.validateRegisterInput = function (user) {
            user.name = !_this.ValidationUtilies.isEmpty(user.name) ? user.name : "";
            user.email = !_this.ValidationUtilies.isEmpty(user.email)
                ? user.email
                : "";
            user.password = !_this.ValidationUtilies.isEmpty(user.password)
                ? user.password
                : "";
            user.confirmPassword = !_this.ValidationUtilies.isEmpty(user.confirmPassword)
                ? user.confirmPassword
                : "";
            if (_this.validator.isLength(user.name, { min: 2, max: 30 })) {
                _this.errors.name = "Name must be between 2 and 30 characters";
            }
            if (_this.validator.isEmail(user.email)) {
                _this.errors.email = "Email field is required";
            }
            if (_this.validator.isEmpty(user.name)) {
                _this.errors.name = "Name field is required";
            }
            if (_this.validator.isEmpty(user.password)) {
                _this.errors.password = "Passowrd field is required";
            }
            if (!(_this.validator.isLength(user.password), { min: 6, max: 30 })) {
                _this.errors.password =
                    "passowrd must be at least 6 characters and no more than 30.";
            }
            if (_this.validator.isEmpty(user.confirmPassword)) {
                _this.errors.confirmPassword = "Confirm passowrd field is required";
            }
            if (!_this.validator.equals(user.password, user.confirmPassword)) {
                _this.errors.confirmPassword = "Passowrd must match";
            }
            return {
                errors: _this.errors,
                isValid: _this.ValidationUtilies.isEmpty(_this.errors),
            };
        };
    }
    return Register;
}());
exports.default = Register;
//# sourceMappingURL=Register.js.map