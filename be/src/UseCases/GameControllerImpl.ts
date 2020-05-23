import GameController from "./GameController";
import Card, { Suit } from "../Entities/Card";
import Table from "../Entities/Table";
import TablesController from "./TablesController";
import User from "../Entities/User";

export default class GameControllerImpl implements GameController {
	private _tableController: TablesController;
	private _tables: Map<String, Table>;
	constructor(tableController: TablesController) {
		this._tableController = tableController;
		this._tables = new Map<String, Table>();
	}

	/**
	 * Este método determina cual de las cartas en mesa es la mayor
	 * Retorna
	 *          1 si gana una carta del equipo 1
	 *          0 si gana una carta del equipo 2
	 */
	private compareCardsInTable(
		tableId: string,
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

	private cambiarTurno(tableId: String, winnerPlayerIndex: number) {
		let currentHand = this._tables.get(tableId).shiftUser;
		let indexCurrentHand = this._tables
			.get(tableId)
			.players.indexOf(currentHand);

		/*console.log("MOVE SAMPLE-->", moveSample);
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
			}
			this._tables.get(tableId).shuffledUser = this._tables.get(
				tableId
			).players[indexCurrentShuffler + 1];
			this._tables.get(tableId).shiftUser = this._tables.get(
				tableId
			).players[indexCurrentShuffler + 1];
		} else {*/
		console.log("indexCurrentHand-->", indexCurrentHand);
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
	): Promise<boolean> {
		let searchTable: Table;
		if (this._tables.get(tableId) === undefined) {
			let _createdTables: Table[] = await this._tableController.getTables();
			_createdTables.filter((table) => {
				return table.id === tableId;
			});
			_createdTables[0].sampleCardInTable = new Card(Suit.Oro, 2);
			this._tables.set(tableId, _createdTables[0]);
		}
		//TO DELETE: usuario agregado en forma provisoria
		this._tables.get(tableId).players.length <
		this._tables.get(tableId).playersQty
			? this._tables.get(tableId).players.push(new User("ppe", "pp"))
			: "";

		//Se juegan todas las cartas necesarias para definir ganador de mano

		//TO DELETE: Se asigna shift user y shuffled user a efectos prácticos
		if (
			this._tables.get(tableId).shiftUser === undefined ||
			this._tables.get(tableId).shuffledUser === undefined
		) {
			this._tables.get(tableId).shiftUser = this._tables
				.get(tableId)
				.players.filter((player) => {
					return player.nickname === user.nickname;
				})[0];

			this._tables.get(tableId).shuffledUser = this._tables
				.get(tableId)
				.players.filter((player) => {
					return player.nickname === user.nickname;
				})[0];
		}

		let currentHand = this._tables.get(tableId).shiftUser;
		let indexCurrentHand = this._tables
			.get(tableId)
			.players.indexOf(currentHand);

		if (this._tables.get(tableId).cardsInTable === undefined) {
			this._tables.get(tableId).cardsInTable = new Array<Card>();
		}

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
			let winnerPlayerIndex = this.compareCardsInTable(
				tableId.toString(),
				searchTable.cardsInTable,
				searchTable.sampleCardInTable
			);
			if (winnerPlayerIndex < searchTable.playersQty / 2) {
				this._tables.get(tableId).tanteadorEquipo1++;
			} else {
				this._tables.get(tableId).tanteadorEquipo2++;
			}
			this.cambiarTurno(tableId, winnerPlayerIndex);

			this._tables.get(tableId).cardsInTable = [];
			return true;
		} else {
			this.cambiarTurno(tableId, null);
			return false;
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
}
