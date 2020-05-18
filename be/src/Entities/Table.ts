import User from "./User";
import FullTableException from "../Exceptions/FullTableException";
import Card from "./Card";

export default class Table {
	private _id: string;
	private _name: string;
	private _players: User[];
	private _awaitingPlayers: User[];
	private _playersQty: number;
	private _isProtected: boolean;
	private _password: string;
	private _cardsInTable: Card[];
	private _sampleCardInTable: Card;
	private _tanteadorEquipo1: number;
	private _tanteadorEquipo2: number;

	constructor(
		name: string,
		playersQty: number = 2,
		isProtected: boolean = false,
		password?: string
	) {
		this._name = name;
		this._playersQty = playersQty;
		this._isProtected = isProtected;
		this._password = password;
		this._players = [];
		this._awaitingPlayers = [];
		this._id = (Math.random() * 10000).toString().split(".")[0];
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
			(player) => player.nickname === nickname
		);
		if (!awaitingPlayer) {
			throw new Error(); //FIXME: manejar caso borde
		}
		this._awaitingPlayers = this._awaitingPlayers.filter(
			(player) => player.nickname !== nickname
		); //Sacarlo de la lista de awaiting players
		this._players.push(player);
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
	 * Getter cardsInTable
	 * @return {Card[]}
	 */
	public get cardsInTable(): Card[] {
		return this._cardsInTable;
	}

	/**
	 * Getter sampleCardInTable
	 * @return {Card}
	 */
	public get sampleCardInTable(): Card {
		return this._sampleCardInTable;
	}

	/**
	 * Setter cardsInTable
	 * @param {card[]} value
	 */
	public set cardsInTable(value: Card[]) {
		this._cardsInTable = value;
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
	public get playersQty(): number {
		return this._playersQty;
	}

	/**
	 * Getter tanteadorEquipo1
	 * @return {number}
	 */
	public get tanteadorEquipo1(): number {
		return this._tanteadorEquipo1;
	}

	/**
	 * Getter tanteadorEquipo2
	 * @return {number}
	 */
	public get tanteadorEquipo2(): number {
		return this._tanteadorEquipo2;
	}

	/**
	 * Setter tanteadorEquipo2
	 * @param {number} value
	 */
	public set tanteadorEquipo2(value: number) {
		this._tanteadorEquipo2 = value;
	}

	/**
	 * Setter tanteadorEquipo1
	 * @param {number} value
	 */
	public set tanteadorEquipo1(value: number) {
		this._tanteadorEquipo1 = value;
	}
}
