import GameController from "./GameController";
import Card from "../Entities/Card";
import { getRandomSubarray } from "../Utils/Arrays";

export default class GameControllerImpl implements GameController {
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
}
