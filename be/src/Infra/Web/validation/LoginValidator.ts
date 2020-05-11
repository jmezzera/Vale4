import User from "../../../Entities/User";
import { Validator } from "validator.ts/Validator";

export default class LoginValidator {
	private validator: Validator;

	constructor() {
		this.validator = new Validator();
	}

	private existErrors = (errors: {
		email: string;
		nickname: string;
		password: string;
	}): boolean => {
		let items = 0;
		let isValid: boolean = false;
		Object.keys(errors).forEach((property) => {
			items++;
			if (errors[property] !== "") {
				isValid = true;
			}
		});
		if (items === Object.keys(errors).length) {
			return isValid;
		}
	};
	private isEmpty = (value: string): boolean => {
		const validation =
			value === undefined ||
			value === null ||
			(typeof value === "object" && Object.keys(value).length === 0) ||
			(typeof value === "string" && value.trim().length === 0);
		return validation;
	};

	public validateLoginInput = (user: User): {} => {
		let errors = {
			email: "",
			nickname: "",
			password: "",
		};

		//Validaciones id usuario (email, nickname)
		if (this.isEmpty(user.email) && this.isEmpty(user.nickname)) {
			errors.email = "El identificador de usuario es requerido";
		}

		let regexEmail = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		if (
			!regexEmail.test(user.email) &&
			!this.validator.isLength(user.nickname, 3, 20)
		) {
			errors.email = "El identificador de usuario ingresado no es válido";
		}

		//Validaciones contraseña
		if (this.isEmpty(user.password)) {
			errors.password = "Contraseña requerida";
		}

		if (!this.validator.isLength(user.password, 6, 30)) {
			errors.password = "La contraseña ingresada no es válida";
		}

		return {
			errors: errors,
			isNotValid: this.existErrors(errors),
		};
	};
}
