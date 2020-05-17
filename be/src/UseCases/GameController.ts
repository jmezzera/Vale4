import Card from "../Entities/Card";

export default interface GameController {
    shuffleDeck(numPlayers: 2 | 4 | 6): { hands: [Card, Card, Card][]; sampleCard: Card };
}
