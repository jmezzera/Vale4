import Card from "../Entities/Card";

export default interface GameController {
	takeGameDecision(data: Card, tableId: String): boolean;
}
