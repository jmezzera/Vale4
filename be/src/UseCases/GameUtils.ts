import Card, { Suit } from "../Entities/Card";

export default class Game {
	public validateFlower(cards: Card[], sampleCard: Card): boolean {
		if (cards.length !== 3) {
			throw new Error("Cards array must contain 3 cards");
		}
		//Las tres del mismo palo
		if (cards[0].suit === cards[1].suit && cards[0].suit === cards[2].suit)
			return true;
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

	public countTouch(cards: Card[], sampleCard: Card): number {
		if (this.validateFlower(cards, sampleCard)) {
			throw new Error("Cannot calculate touch on flower");
		}
		let piece = cards.find(card => card.isPieza(sampleCard));
		if (piece) {
			let notPieces = cards.filter(card => !card.isPieza(sampleCard));
			//notPieces tiene largo 2. Hay mínimo una pieza (el if lo verifica) y máximo 1 pieza (si hubiera más sería flor)
			let biggestCard = Math.max(
				notPieces[0].getPoints(sampleCard),
				notPieces[1].getPoints(sampleCard)
			);

			return 20 + piece.getPoints(sampleCard) + biggestCard;
		}
		let suitsQtys: {
			Basto?: number;
			Espada?: number;
			Copa?: number;
			Oro?: number;
		} = cards
			.map(card => card.suit)
			.reduce((prev, curr) => {
				if (prev[Suit[curr]]) {
					prev[Suit[curr]]++;
				} else {
					prev[Suit[curr]] = 1;
				}
				return prev;
			}, {});
		if (Math.max(...Object.values(suitsQtys)) === 2) {
			const suitName = Object.keys(suitsQtys).find(
				suitName => suitsQtys[suitName] === 2
			);
			const cardsOfThatSuit = cards.filter(
				card => card.suit === Suit[suitName]
			);
			return (
				20 +
				cardsOfThatSuit[0].getPoints(sampleCard) +
				cardsOfThatSuit[1].getPoints(sampleCard)
			);
		} else {
			//Todas de distinto palo
			return Math.max(...cards.map(card => card.getPoints(sampleCard)));
		}
	}

	public countFlower(cards: Card[], sampleCard: Card): number {
		if (!this.validateFlower(cards, sampleCard)) {
			throw new Error("Not Flower");
		}
		return (
			20 +
			cards.reduce((prev, curr) => prev + curr.getPoints(sampleCard), 0)
		);
	}
}
