import User from "./User";
import Card from "./Card";

export default class Player extends User {
	private _cards: Card[];
	constructor(user: User) {
		super(
			user.nickname,
			user.email,
			user.password,
			user.confirmPassword,
			user.name,
			user.surname
		);
		this._cards = [];
	}

	public dealCards(cards: Card[]): void {
		this._cards = cards;
	}

	public get cards(): Card[] {
		return this._cards;
	}
	public set cards(value: Card[]) {
		this._cards = value;
	}
}
