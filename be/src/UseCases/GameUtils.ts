import Card from "../Entities/Card";

export default class Game {
    public validateFlower(cards: Card[], sampleCard: Card): boolean {
        if (cards.length !== 3) {
            throw new Error("Cards array must contain 3 cards");
        }
        //Las tres del mismo palo
        if (cards[0].suit === cards[1].suit && cards[0].suit === cards[2].suit) return true;
        const piecesQty = cards
            .map(card => card.isPieza(sampleCard))
            .reduce((prev, curr) => {
                if (curr) {
                    prev++;
                }
                return prev;
            }, 0);

        if (piecesQty >= 2) {
            //Nunca va a ser 3 porque entonces serian las tres del mismo palo. Igual se deja la desigualdad por claridad
            return true;
        } else if (piecesQty === 1) {
            let otherCards = cards.filter(card => !card.isPieza(sampleCard));
            //otherCards sí o sí es un array de 2 elementos (a tres cartas se le saca 1)
            return otherCards[0].suit === otherCards[1].suit;
        } else return false; //Ya se descartó el caso de 3 del mismo palo
    }
}
