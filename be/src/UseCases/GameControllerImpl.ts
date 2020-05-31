import GameController from "./GameController";
import Card from "../Entities/Card";
import { getRandomSubarray } from "../Utils/Arrays";
import EventEmitter from "../Infra/Web/EventEmitter";
import Table, { TableSate } from "../Entities/Table";

export default class GameControllerImpl implements GameController {
    private _tablesConnections: EventEmitter;
    public shuffleDeck(numplayers: 2 | 4 | 6): { hands: [Card, Card, Card][]; sampleCard: Card } {
        const allCards = Card.getAllCards();
        const cardQty = 3 * numplayers + 1;
        const shuffledCards = getRandomSubarray(allCards, cardQty);
        let hands: [Card, Card, Card][] = [];
        let index = 0;
        for (let player = 0; player < numplayers; player++) {
            hands.push([shuffledCards[index], shuffledCards[index + 1], shuffledCards[index + 2]]);
            index += 3;
        }
        const sampleCard = shuffledCards[index];
        return { hands, sampleCard };
    }

    public dealCards(table: Table): void {
        const hands = this.shuffleDeck(table.playersQty);
        for (let index = 0; index < table.playersQty; index++) {
            table.players[index].dealCards(hands.hands[index]);
        }
        this._tablesConnections.dealCards(table, hands);
        table.state = TableSate.AWAITING_CARD;
    }

    public set tablesConnection(tablesConnection: EventEmitter) {
        this._tablesConnections = tablesConnection;
    }
}
