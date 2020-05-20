import GameController from "./GameController";
import Card from "../Entities/Card";
import Table from "../Entities/Table";

export default class GameControllerImpl implements GameController {
	private _tables: Map<String, Table>;
	constructor() {}

	/**
	 * Este método determina cual de las cartas en mesa es la mayor
	 * Retorna
	 *          1 si gana una carta del equipo 1
	 *          0 si gana una carta del equipo 2
	 */
	private compareCardsInTable(
		cardsInGame: Card[],
		sampleCardInGame: Card,
		teamSize: number
	): number {
		let winnerTeam: number;
		let orderArray = cardsInGame.sort((cardA: Card, cardB: Card) => {
			return cardA.compareTo(cardB, sampleCardInGame);
		});
		if (cardsInGame.indexOf(orderArray[0]) >= teamSize) {
			winnerTeam = 0;
		} else {
			winnerTeam = 1;
		}
		return winnerTeam;
	}

	private cambiarTurno(tableId: String) {
		let currentHand = this._tables.get(tableId).shiftUser;
		let indexCurrentHand = this._tables
			.get(tableId)
			.players.indexOf(currentHand);
		if (indexCurrentHand == this._tables.get(tableId).players.length) {
			indexCurrentHand = 0;
			this._tables.get(tableId).shiftUser = this._tables.get(
				tableId
			).players[0];
		} else {
			this._tables.get(tableId).shiftUser = this._tables.get(
				tableId
			).players[indexCurrentHand];
		}
	}

	/**
	 * @param data
	 * @param tableId
	 * Este método retorna True en caso de tener que volverse a repartir
	 */
	takeGameDecision(data: Card, tableId: String): boolean {
		let searchTable: Table;
		searchTable = this._tables.get(tableId);
		let numberOfPlayers = searchTable.playersQty;
		//Se juegan todas las cartas necesarias para definir ganador de mano
		if (searchTable.cardsInTable.length - 1 == numberOfPlayers) {
			let winnerTeam = this.compareCardsInTable(
				searchTable.cardsInTable,
				searchTable.sampleCardInTable,
				searchTable.playersQty / 2
			);
			if (winnerTeam) {
				this._tables.get(tableId).tanteadorEquipo1 += 1;
			} else {
				this._tables.get(tableId).tanteadorEquipo2 += 1;
			}
			this.cambiarTurno(tableId);
			return true;
		} else {
			let currentHand = this._tables.get(tableId).shiftUser;
			let indexCurrentHand = this._tables
				.get(tableId)
				.players.indexOf(currentHand);
			this.cambiarTurno(tableId);
			this._tables.get(tableId).cardsInTable[indexCurrentHand] = data;
			return false;
		}
	}
}
