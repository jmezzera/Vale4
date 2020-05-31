import Card from "../Entities/Card";
import EventEmitter from "../Infra/Web/EventEmitter";
import User from "../Entities/User";
import Table from "../Entities/Table";

export default interface GameController {
	tablesConnection: EventEmitter;
	takeGameDecision(data: Card, tableId: String, user: User): Promise<boolean>;
	shuffleDeck(
		numPlayers: 2 | 4 | 6
	): { hands: [Card, Card, Card][]; sampleCard: Card };
	dealCards(table: Table): void;
}
