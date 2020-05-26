import Table from "../../Entities/Table";
import Card from "../../Entities/Card";

export default interface EventEmitter {
    dealCards(table: Table, cards: { hands: [Card, Card, Card][]; sampleCard: Card }): void;
}
