import Card from "../Entities/Card";

export interface GameController {
	takeGameDecision(data: Card, tableId: String): boolean;
}
