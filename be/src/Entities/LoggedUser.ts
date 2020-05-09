import User from "./User";

export default class LoggedUser extends User {
	private _token: string;

	constructor(nickname: string, email: string, token: string) {
		super(nickname, email);
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
