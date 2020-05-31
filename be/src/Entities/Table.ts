import User from "./User";
import FullTableException from "../Exceptions/FullTableException";
import Player from "./Player";

export default class Table {
    private _id: string;
    private _name: string;
    private _players: Player[];
    private _awaitingPlayers: User[];
    private _playersQty: 2 | 4 | 6;
    private _isProtected: boolean;
    private _password: string;
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
    }

    public addPlayer(player: User): void {
        if (this._players.length >= this._playersQty) {
            throw new FullTableException("Full table");
        }
        this._awaitingPlayers.push(player);
    }

    public connectPlayer(player: User): void {
        const nickname = player.nickname;
        let awaitingPlayer = this._awaitingPlayers.find(player => player.nickname === nickname);
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

    public get state(): TableSate {
        return this._state;
    }

    public set state(state: TableSate) {
        this._state = state;
    }

    public get playersQty(): 2 | 4 | 6 {
        return this._playersQty;
    }

    public get players(): Player[] {
        return this._players;
    }
}

enum TableSate {
    AWAITING_PLAYER,
    AWAITING_CARD,
    AWAITING_RESPONSE,
    DEALING,
}

export { TableSate };
