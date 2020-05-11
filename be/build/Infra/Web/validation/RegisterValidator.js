"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator_1 = require("validator.ts/Validator");
var RegisterValidator = /** @class */ (function () {
    function RegisterValidator() {
        var _this = this;
        this.existErrors = function (errors) {
            var items = 0;
            var isValid = false;
            Object.keys(errors).forEach(function (property) {
                items++;
                if (errors[property] !== "") {
                    isValid = true;
                }
                if (items === Object.keys(errors).length) {
                    return isValid;
                }
            });
            if (items === Object.keys(errors).length) {
                return isValid;
            }
        };
        this.isEmpty = function (value) {
            var validation = value === undefined ||
                value === null ||
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
            //Validaciones nombre
            if (_this.isEmpty(user.name)) {
                errors.name = "Nombre requerido";
            }
            if (!_this.validator.isLength(user.name, 3, 20)) {
                errors.name = "El nombre debe tener entre 3 y 20 caracteres";
            }
            //Validaciones nickname
            if (_this.isEmpty(user.nickname)) {
                errors.nickname = "El nickname es requerido";
            }
            if (!_this.validator.isLength(user.nickname, 3, 20)) {
                errors.nickname = "El nickname debe tener entre 3 y 20 caracteres";
            }
            //Validaciones apellido
            if (_this.isEmpty(user.surname)) {
                errors.surname = "El apellido es requerido";
            }
            if (!_this.validator.isLength(user.surname, 3, 20)) {
                errors.surname = "El apellido debe tener entre 3 y 20 caracteres";
            }
            //Validaciones email
            if (_this.isEmpty(user.email)) {
                errors.email = "El email es requerido";
            }
            var regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (!regexEmail.test(user.email)) {
                errors.email = "El email ingresado no es válido";
            }
            //Validaciones contraseñas
            if (_this.isEmpty(user.password)) {
                errors.password = "Contraseña requerida";
            }
            if (!_this.validator.isLength(user.password, 6, 30)) {
                errors.password =
                    "La contraseña debe tener una longitud mínima de 6 caracteres y no mayor a 30.";
            }
            if (_this.isEmpty(user.confirmPassword)) {
                errors.confirmPassword = "Contraseña de confirmación requerida";
            }
            else if (!_this.validator.equals(user.password, user.confirmPassword)) {
                errors.confirmPassword =
                    "Las contraseñas ingresadas deben coincidir";
            }
            return {
                errors: errors,
                isNotValid: _this.existErrors(errors),
            };
        };
        this.validator = new Validator_1.Validator();
    }
    return RegisterValidator;
}());
exports.default = RegisterValidator;
//# sourceMappingURL=RegisterValidator.js.map