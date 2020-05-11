"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("validator.ts/Validator");
var LoginValidator = /** @class */ (function () {
    function LoginValidator() {
        var _this = this;
        this.existErrors = function (errors) {
            var items = 0;
            var isValid = false;
            Object.keys(errors).forEach(function (property) {
                items++;
                if (errors[property] !== "") {
                    isValid = true;
                }
            });
            if (items === Object.keys(errors).length) {
                return isValid;
            }
        };
        this.isEmpty = function (value) {
            var validation = value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0);
            return validation;
        };
        this.validateLoginInput = function (user) {
            var errors = {
                email: "",
                nickname: "",
                password: "",
            };
            //Validaciones id usuario (email, nickname)
            if (_this.isEmpty(user.email) && _this.isEmpty(user.nickname)) {
                errors.email = "El identificador de usuario es requerido";
            }
            var regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (!regexEmail.test(user.email) &&
                !_this.validator.isLength(user.nickname, 3, 20)) {
                errors.email = "El identificador de usuario ingresado no es válido";
            }
            //Validaciones contraseña
            if (_this.isEmpty(user.password)) {
                errors.password = "Contraseña requerida";
            }
            if (!_this.validator.isLength(user.password, 6, 30)) {
                errors.password = "La contraseña ingresada no es válida";
            }
            return {
                errors: errors,
                isNotValid: _this.existErrors(errors),
            };
        };
        this.validator = new Validator_1.Validator();
    }
    return LoginValidator;
}());
exports.default = LoginValidator;
//# sourceMappingURL=LoginValidator.js.map