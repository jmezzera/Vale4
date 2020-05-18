import { GameController } from "./GameController";
import Card from "../Entities/Card";
import Table from "../Entities/Table";

class GameControllerImpl implements GameController {
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
		let orderArray = cardsInGame.sort(sampleCardInGame.compareTo);
		if (cardsInGame.indexOf(orderArray[0]) >= teamSize) {
			winnerTeam = 0;
		} else {
			winnerTeam = 1;
		}
		return winnerTeam;
	}

	/*
                *
                *Ver que pasa con la determinación de la última carta jugada
                *
                if (utlimoEventoCartaJugada == data.carta)
                return;
                utlimoEventoCartaJugada = data.carta;*/

	/*hay carta en mesa? - Ver caso para 2 jugadores de momento
                    //Si --> CambioTurno() (debe sumar al tanteador de cada equipo para la ronda)
                                debo terminar ronda? (algún equipo/jugador ganó 2 manos)
                                //Si --> valido quien ganó, sumo al tanteador y notifico que se deben levantar las cartas
                                //No -- > No hago nada más
                    //No --> ultimaCarta = cartaJugada;
                                
                Emito evento cartaJugada*/
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
			this.compareCardsInTable(
				searchTable.cardsInTable,
				searchTable.sampleCardInTable,
				searchTable.playersQty / 2
			);
		} else {
			return false;
		}
	}
}
