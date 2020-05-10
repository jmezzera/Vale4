import User from "../../../Entities/User";
import { Validator } from "validator.ts/Validator";
import {
    Contains,
    IsInt,
    IsLength,
    IsEmail,
    IsFQDN,
    IsDate,
} from "validator.ts/decorator/Validation";

export default class RegisterValidator {
    private validator: Validator;

    constructor() {
        this.validator = new Validator();
    }

    private existErrors = (errors): boolean => {
        Object.keys(errors).forEach(function (property) {
            if (errors[property] !== "") {
                return true;
            }
        });
        return false;
    };
    private isEmpty = (value): boolean => {
        const validation =
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0);
        return validation;
    };

    public validateRegisterInput = (user: User): {} => {
        let errors = {
            name: "",
            surname: "",
            email: "",
            nickname: "",
            password: "",
            confirmPassword: "",
        };

        user.name = !this.isEmpty(user.name) ? user.name : "";
        user.email = !this.isEmpty(user.email) ? user.email : "";
        user.password = !this.isEmpty(user.password) ? user.password : "";
        user.confirmPassword = !this.isEmpty(user.confirmPassword) ? user.confirmPassword : "";
        if (!this.validator.isLength(user.name, 2, 20)) {
            errors.name = "Name must be between 2 and 20 characters";
        }

        /*if (this.validator.isEmail(user.email)) {
			errors.email = "Email field is required";
		}*/

        if (this.isEmpty(user.name)) {
            errors.name = "Name field is required";
        }

        if (this.isEmpty(user.password)) {
            errors.password = "Passowrd field is required";
        }

        if (!this.validator.isLength(user.password, 6, 30)) {
            errors.password = "passowrd must be at least 6 characters and no more than 30.";
        }

        if (this.isEmpty(user.confirmPassword)) {
            errors.confirmPassword = "Confirm passowrd field is required";
        }
        if (!this.validator.equals(user.password, user.confirmPassword)) {
            errors.confirmPassword = "Passowrd must match";
        }

        return {
            errors: errors,
            isNotValid: this.existErrors(errors),
        };
    };
}
