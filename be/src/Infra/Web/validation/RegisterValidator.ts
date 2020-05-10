import User from "../../../Entities/User";
import { Validator } from "validator.ts/Validator";

export default class RegisterValidator {
	private validator: Validator;

	constructor() {
		this.validator = new Validator();
	}

	private existErrors = (errors): boolean => {
		let items = 0;
		let isValid: boolean = false;
		Object.keys(errors).forEach((property) => {
			items++;
			if (errors[property] !== "") {
				isValid = true;
			}
			if (items == Object.keys(errors).length) {
				return isValid;
			}
		});
		if (items == Object.keys(errors).length) {
			return isValid;
		}
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
		let regexEmail = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);

		//Validaciones nombre
		if (this.isEmpty(user.name)) {
			errors.name = "Nombre requerido";
		}
		if (!this.validator.isLength(user.name, 3, 20)) {
			errors.name = "El nombre debe tener entre 3 y 20 caracteres";
		}

		//Validaciones nickname
		if (this.isEmpty(user.nickname)) {
			errors.nickname = "El nickname es requerido";
		}
		if (!this.validator.isLength(user.nickname, 3, 20)) {
			errors.nickname = "El nickname debe tener entre 3 y 20 caracteres";
		}

		//Validaciones apellido
		if (this.isEmpty(user.surname)) {
			errors.surname = "El apellido es requerido";
		}
		if (!this.validator.isLength(user.surname, 3, 20)) {
			errors.surname = "El apellido debe tener entre 3 y 20 caracteres";
		}

		//Validaciones email
		if (this.isEmpty(user.email)) {
			errors.email = "El email es requerido";
		}
		if (regexEmail.test(user.email)) {
			errors.email = "El email ingresado no es válido";
		}

		//Validaciones contraseñas
		if (this.isEmpty(user.password)) {
			errors.password = "Contraseña requerida";
		}

		if (!this.validator.isLength(user.password, 6, 30)) {
			errors.password =
				"La contraseña debe tener una longitud mínima de 6 caracteres y no mayor a 30.";
		}

		if (this.isEmpty(user.confirmPassword)) {
			errors.confirmPassword = "Contraseña de confirmación requerida";
		}
		if (!this.validator.equals(user.password, user.confirmPassword)) {
			errors.confirmPassword =
				"Las contraseñas ingresadas deben coincidir";
		}

		return {
			errors: errors,
			isNotValid: this.existErrors(errors),
		};
	};
}
