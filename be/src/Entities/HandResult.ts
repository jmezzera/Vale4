import User from "./User";

export default class HandResult {
	private _shiftUser: User;
	private _shuffledUser: User;
	private _needShuffle: boolean;
	constructor(shiftUser: User, shuffledUser: User, needShuffle: boolean) {
		this._shiftUser = shiftUser;
		this._shuffledUser = shuffledUser;
		this._needShuffle = needShuffle;
	}

	/**
	 * Getter _shuffledUser
	 * @return {User}
	 */
	public get shuffledUser(): User {
		return this._shuffledUser;
	}

	/**
	 * Setter _shuffledUser
	 * @return {User}
	 */
	public set shuffledUser(value: User) {
		this._shuffledUser = value;
	}

	/**
	 * Getter needShuffle
	 * @return {boolean}
	 */
	public get needShuffle(): boolean {
		return this._needShuffle;
	}

	/**
	 * Setter needShuffle
	 * @return {boolean}
	 */
	public set needShuffle(value: boolean) {
		this._needShuffle = value;
	}

	/**
	 * Getter shiftUser
	 * @return {User}
	 */
	public get shiftUser(): User {
		return this._shiftUser;
	}

	/**
	 * Setter shiftUser
	 * @return {User}
	 */
	public set shiftUser(value: User) {
		this._shiftUser = value;
	}
}
