import GameController from "./GameController";
import Card, { Suit } from "../Entities/Card";
import Table from "../Entities/Table";
import TablesController from "./TablesController";
import User from "../Entities/User";
import { getRandomSubarray } from "../Utils/Arrays";
import EventEmitter from "../Infra/Web/EventEmitter";
import { TableSate } from "../Entities/Table";
import Player from "../Entities/Player";
import HandResult from "../Entities/HandResult";

export default class GameControllerImpl implements GameController {
	private _tables: Map<String, Table>;
	private _tablesConnections: EventEmitter;
	private _tablesController: TablesController;

	constructor() {
		this._tables = new Map<String, Table>();
	}

	/**
	 * Este método determina cual de las cartas en mesa es la mayor
	 * Retorna
	 *          1 si gana una carta del equipo 1
	 *          0 si gana una carta del equipo 2
	 */
	private compareCardsInGame(
		cardsInGame: Card[],
		sampleCardInGame: Card
	): number {
		let winnerPlayerIndex: number;
		let auxCardsInGame: Card[] = [...cardsInGame];
		let orderArray = cardsInGame.sort((cardA: Card, cardB: Card) => {
			return cardA.compareTo(cardB, sampleCardInGame);
		});
		winnerPlayerIndex = auxCardsInGame.indexOf(
			orderArray[orderArray.length - 1]
		);

		return winnerPlayerIndex;
	}

	private async changeShift(
		tableId: String,
		winnerPlayerIndex: number,
		moveSample: boolean
	) {
		let currentHand = this._tables.get(tableId).shiftUser;
		let currentShuffler = this._tables.get(tableId).shiftUser;

		let auxArrayCurrentHand = this._tables
			.get(tableId)
			.players.filter(player => {
				if (player.nickname === currentHand.nickname) return player;
			});

		let auxArrayCurrentShuffler = this._tables
			.get(tableId)
			.players.filter(player => {
				if (player.nickname === currentShuffler.nickname) return player;
			});

		let indexCurrentHand = this._tables
			.get(tableId)
			.players.indexOf(auxArrayCurrentHand[0]);

		let indexCurrentShuffler = this._tables
			.get(tableId)
			.players.indexOf(auxArrayCurrentShuffler[0]);
		if (moveSample) {
			if (
				indexCurrentShuffler + 1 ==
				this._tables.get(tableId).players.length
			) {
				this._tables.get(tableId).shuffledUser = this._tables.get(
					tableId
				).players[0];
				this._tables.get(tableId).shiftUser = this._tables.get(
					tableId
				).players[0];
			} else {
				this._tables.get(tableId).shuffledUser = this._tables.get(
					tableId
				).players[indexCurrentShuffler + 1];
				this._tables.get(tableId).shiftUser = this._tables.get(
					tableId
				).players[indexCurrentShuffler + 1];
			}
		} else {
			if (winnerPlayerIndex != null) {
				this._tables.get(tableId).shiftUser = this._tables.get(
					tableId
				).players[winnerPlayerIndex];
			} else {
				if (
					indexCurrentHand + 1 ==
					this._tables.get(tableId).players.length
				) {
					this._tables.get(tableId).shiftUser = this._tables.get(
						tableId
					).players[0];
				} else {
					this._tables.get(tableId).shiftUser = this._tables.get(
						tableId
					).players[indexCurrentHand + 1];
				}
			}
		}
	}
	/**
	 * @param data
	 * @param tableId
	 * @param user
	 * Este método retorna True en caso de tener que volverse a repartir
	 */
	async takeGameDecision(
		data: Card,
		tableId: String,
		user: User
	): Promise<HandResult> {
		let searchTable: Table;

		if (
			this._tables.get(tableId) == null ||
			this._tables.get(tableId) === undefined
		) {
			let _createdTables: Table[] = await this._tablesController.getTables();
			_createdTables.filter(table => {
				return table.id === tableId;
			});
			if (_createdTables.length == 0) {
				throw new Error("La mesa enviada por el cliente no existe");
			} else {
				this._tables.set(tableId, _createdTables[0]);
			}
		}
		let currentHand = this._tables.get(tableId).shiftUser;

		let auxArray = this._tables.get(tableId).players.filter(player => {
			if (player.nickname === currentHand.nickname) return player;
		});
		let indexCurrentHand = this._tables
			.get(tableId)
			.players.indexOf(auxArray[0]);

		this._tables
			.get(tableId)
			.cardsInTable.splice(indexCurrentHand, 0, data);

		searchTable = this._tables.get(tableId);

		//TODO: Validación de datos en mesa

		let numberOfPlayers = searchTable.playersQty;

		if (
			searchTable.cardsInTable !== undefined &&
			searchTable.cardsInTable.length == numberOfPlayers
		) {
			let winnerPlayerIndex = this.compareCardsInGame(
				searchTable.cardsInTable,
				searchTable.sampleCardInTable
			);
			//Validación de que sea última mano y tengamos que repartir
			let moveSample: boolean;
			searchTable.players[0].cards.length == 0
				? (moveSample = true)
				: (moveSample = false);

			this.addScore(tableId, winnerPlayerIndex);
			this.changeShift(tableId, winnerPlayerIndex, moveSample);
			for (
				let index = 0;
				index < this._tables.get(tableId).players.length;
				index++
			) {
				this._tables.get(tableId).players[
					index
				].cards = this._tables
					.get(tableId)
					.players[index].cards.filter(card => {
						for (
							let j = 0;
							j < this._tables.get(tableId).cardsInTable.length;
							j++
						) {
							if (
								card !=
								this._tables.get(tableId).cardsInTable[j]
							)
								return card;
						}
					});
			}

			this._tables.get(tableId).cardsInTable = [];
			let shiftUser = searchTable.shiftUser;
			let shuffledUser = searchTable.shuffledUser;
			let _handResult = new HandResult(shiftUser, shuffledUser, true);
			return _handResult;
		} else {
			this.changeShift(tableId, null, null);
			let shiftUser = searchTable.shiftUser;
			let shuffledUser = searchTable.shuffledUser;
			let _handResult = new HandResult(shiftUser, shuffledUser, false);
			return _handResult;
		}
	}
	/**
	 * Setter tables
	 * @param {Map<String, Table>} value
	 */
	public set tables(value: Map<String, Table>) {
		this._tables = value;
	}

	/**
	 * Getter tables
	 * @return {string}
	 */
	public get tables(): Map<String, Table> {
		return this._tables;
	}

	public shuffleDeck(
		numplayers: 2 | 4 | 6
	): { hands: [Card, Card, Card][]; sampleCard: Card } {
		const allCards = Card.getAllCards();
		const cardQty = 3 * numplayers + 1;
		const shuffledCards = getRandomSubarray(allCards, cardQty);
		let hands: [Card, Card, Card][] = [];
		let index = 0;
		for (let player = 0; player < numplayers; player++) {
			hands.push([
				shuffledCards[index],
				shuffledCards[index + 1],
				shuffledCards[index + 2],
			]);
			index += 3;
		}
		const sampleCard = shuffledCards[index];
		return { hands, sampleCard };
	}

	public dealCards(table: Table): void {
		//Se define como mano y repartidor al primer usuario que entró (podría ser random)
		let shuffledUser: User = new User(
			table.players[0].nickname,
			table.players[0].email
		);
		let shiftUser: User = new User(
			table.players[0].nickname,
			table.players[0].email
		);
		table.shuffledUser = shuffledUser;
		table.shiftUser = shiftUser;
		const { hands, sampleCard } = this.shuffleDeck(table.playersQty);
		for (let index = 0; index < table.playersQty; index++) {
			table.players[index].dealCards(hands[index]);
		}
		table.sampleCardInTable = sampleCard;
		this._tablesConnections.dealCards(table, { hands, sampleCard });
		table.state = TableSate.AWAITING_CARD;
	}

	private addScore(tableId: String, winnerPlayerIndex: number) {
		if (winnerPlayerIndex < this._tables.get(tableId).playersQty / 2) {
			this._tables.get(tableId).scorerTeam1++;
		} else {
			this._tables.get(tableId).scorerTeam2++;
		}
	}

	public set tablesConnection(tablesConnection: EventEmitter) {
		this._tablesConnections = tablesConnection;
	}

	public set tablesController(tablesController: TablesController) {
		this._tablesController = tablesController;
	}
}
