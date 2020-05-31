import Card from "../Entities/Card";
import User from "../Entities/User";

export default interface GameController {
	takeGameDecision(data: Card, tableId: String, user: User): Promise<boolean>;
	shuffleDeck(
		numPlayers: 2 | 4 | 6
	): { hands: [Card, Card, Card][]; sampleCard: Card };
}
