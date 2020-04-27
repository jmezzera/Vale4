import User from "./User";

export class LoggedUser extends User {
	private _token: string;

	constructor(
		name: string,
		surname: string,
		nickname: string,
		email: string,
		password: string,
		token: string
	) {
		super(name, surname, nickname, email, password);
		this._token = token;
	}

	/**
	 * Getter token
	 * @return {string}
	 */
	public get token(): string {
		return this._token;
	}

	/**
	 * Setter token
	 * @param {string} value
	 */
	public set token(value: string) {
		this._token = value;
	}
}
