export default class User {
	private _name: string;
	private _surname: string;
	private _nickname: string;
	private _email: string;
	private _password: string;
	private _confirmPassword: string;

	constructor(
		nickname: string,
		email: string,
		password?: string,
		confirmPassword?: string,
		name?: string,
		surname?: string
	) {
		this._nickname = nickname;
		this._email = email;
		this._password = password;
		this._confirmPassword = confirmPassword;
		this._name = name;
		this._surname = surname;
	}
	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Setter name
	 * @param {string} value
	 */
	public set name(value: string) {
		this._name = value;
	}

	/**
	 * Getter surname
	 * @return {string}
	 */
	public get surname(): string {
		return this._surname;
	}

	/**
	 * Setter surname
	 * @param {string} value
	 */
	public set surname(value: string) {
		this._surname = value;
	}

	/**
	 * Getter nickname
	 * @return {string}
	 */
	public get nickname(): string {
		return this._nickname;
	}

	/**
	 * Setter nickname
	 * @param {string} value
	 */
	public set nickname(value: string) {
		this._nickname = value;
	}

	/**
	 * Getter email
	 * @return {string}
	 */
	public get email(): string {
		return this._email;
	}

	/**
	 * Setter email
	 * @param {string} value
	 */
	public set email(value: string) {
		this._email = value;
	}

	/**
	 * Getter password
	 * @return {string}
	 */
	public get password(): string {
		return this._password;
	}

	/**
	 * Setter password
	 * @param {string} value
	 */
	public set password(value: string) {
		this._password = value;
	}

	/**
	 * Getter confirmPassword
	 * @return {string}
	 */
	public get confirmPassword(): string {
		return this._confirmPassword;
	}

	/**
	 * Setter confirmPassword
	 * @param {string} value
	 */
	public set confirmPassword(value: string) {
		this._confirmPassword = value;
	}
}
