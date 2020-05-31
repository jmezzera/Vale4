import User from "./User";
import FullTableException from "../Exceptions/FullTableException";
import Card from "./Card";
import Player from "./Player";

export default class Table {
	private _id: string;
	private _name: string;
	private _players: Player[];
	private _awaitingPlayers: User[];
	private _playersQty: 2 | 4 | 6;
	private _isProtected: boolean;
	private _password: string;
	private _sampleCardInTable: Card;
	private _scorerTeam1: number;
	private _scorerTeam2: number;
	private _shiftUser: User;
	private _shuffledUser: User;
	private _state: TableSate;

	constructor(
		name: string,
		playersQty: number = 2,
		isProtected: boolean = false,
		password?: string
	) {
		if (playersQty !== 2 && playersQty !== 4 && playersQty !== 6) {
			throw new Error("Invalid players quantity");
		}
		this._name = name;
		this._playersQty = playersQty;
		this._isProtected = isProtected;
		this._password = password;
		this._players = [];
		this._awaitingPlayers = [];
		this._id = (Math.random() * 10000).toString().split(".")[0];
		this._state = TableSate.AWAITING_PLAYER;
		this.scorerTeam1 = 0;
		this.scorerTeam2 = 0;
	}

	public addPlayer(player: User): void {
		if (this._players.length >= this._playersQty) {
			throw new FullTableException("Full table");
		}
		this._awaitingPlayers.push(player);
	}

	public connectPlayer(player: User): void {
		const nickname = player.nickname;
		let awaitingPlayer = this._awaitingPlayers.find(
			player => player.nickname === nickname
		);
		if (!awaitingPlayer) {
			throw new Error(); //FIXME: manejar caso borde
		}
		this._awaitingPlayers = this._awaitingPlayers.filter(
			player => player.nickname !== nickname
		); //Sacarlo de la lista de awaiting players
		let connectedPlayers = this._players.push(new Player(player));
		if (connectedPlayers === this._playersQty) {
			this._state = TableSate.DEALING;
		}
	}

	/**
	 * Getter id
	 * @return {string}
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * Getter name
	 * @return {string}
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Getter isProtected
	 * @return {boolean}
	 */
	public get isProtected(): boolean {
		return this._isProtected;
	}

	/**
	 * Getter password
	 * @return {string}
	 */
	public get password(): string {
		return this._password;
	}

	/**
	 * Getter sampleCardInTable
	 * @return {Card}
	 */
	public get sampleCardInTable(): Card {
		return this._sampleCardInTable;
	}

	/**
	 * Setter sampleCardInTable
	 * @param {card} value
	 */
	public set sampleCardInTable(value: Card) {
		this._sampleCardInTable = value;
	}

	/**
	 * Getter playersQty
	 * @return {number}
	 */
	public get playersQty(): 2 | 4 | 6 {
		return this._playersQty;
	}

	/**
	 * Getter scorerTeam1
	 * @return {number}
	 */
	public get scorerTeam1(): number {
		return this._scorerTeam1;
	}

	/**
	 * Getter scorerTeam2
	 * @return {number}
	 */
	public get scorerTeam2(): number {
		return this._scorerTeam2;
	}

	/**
	 * Setter scorerTeam2
	 * @param {number} value
	 */
	public set scorerTeam2(value: number) {
		this._scorerTeam2 = value;
	}

	/**
	 * Setter scorerTeam1
	 * @param {number} value
	 */
	public set scorerTeam1(value: number) {
		this._scorerTeam1 = value;
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
	 * @param {User} value
	 */
	public set shiftUser(value: User) {
		this._shiftUser = value;
	}

	/**
	 * Getter players
	 * @return {Player[]}
	 */
	public get players(): Player[] {
		return this._players;
	}

	/**
	 * Setter shuffledUser
	 * @param {User} value
	 */
	public set shuffledUser(value: User) {
		this._shuffledUser = value;
	}

	/**
	 * Getter shuffledUser
	 * @return {User}
	 */
	public get shuffledUser(): User {
		return this._shuffledUser;
	}

	/**
	 * Getter state
	 * @return {enum}
	 */
	public get state(): TableSate {
		return this._state;
	}

	/**
	 * Setter state
	 * @param {TableSate} value
	 */
	public set state(state: TableSate) {
		this._state = state;
	}
}

enum TableSate {
	AWAITING_PLAYER,
	AWAITING_CARD,
	AWAITING_RESPONSE,
	DEALING,
}

export { TableSate };
