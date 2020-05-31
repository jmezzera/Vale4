import Card from "../Entities/Card";
import EventEmitter from "../Infra/Web/EventEmitter";
import Table from "../Entities/Table";

export default interface GameController {
    tablesConnection: EventEmitter;
    shuffleDeck(numPlayers: 2 | 4 | 6): { hands: [Card, Card, Card][]; sampleCard: Card };
    dealCards(table: Table): void;
}
