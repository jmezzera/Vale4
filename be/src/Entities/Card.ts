enum Suit {
    "Copa",
    "Basto",
    "Espada",
    "Oro",
}

export default class Card {
    private _suit: Suit;
    private _number: number;
    public static piezas = [2, 4, 5, 11, 10];
    public static matas = [
        new Card(Suit.Espada, 1),
        new Card(Suit.Basto, 1),
        new Card(Suit.Espada, 7),
        new Card(Suit.Oro, 7),
    ];
    public static normalCards = [3, 2, 1, 12, 11, 10, 7, 6, 5, 4];
    public static getAllCards = () => {
        let allCards: Card[] = [];
        const suits = [Suit.Copa, Suit.Basto, Suit.Espada, Suit.Oro];
        for (let suit of suits) {
            for (let number of [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]) {
                allCards.push(new Card(suit, number));
            }
        }
        return allCards;
    };

    constructor(suit: Suit, number: number) {
        this._suit = suit;
        this._number = number;
    }

    /**
     * @param other { Card } - Carta para comparar
     * @param sampleCard { Card } - Muestra
     * @returns {number} 1: si this es mas grande que other, -1 si other es mas grande que this o 0 si son iguales
     */
    public compareTo(other: Card, sampleCard: Card): number {
        if (this.isPieza(sampleCard) || other.isPieza(sampleCard)) {
            if (this.isPieza(sampleCard) && other.isPieza(other)) {
                //Las dos son piezas
                //En caso de que alguna de las dos sea el alcahuete, lo intercambio con la muestra
                let _this: Card = this;
                if (this.number === 12) {
                    _this = sampleCard;
                } else if (other.number === 12) {
                    other = sampleCard;
                }
                //Me fijo cuál aparece primero en el array piezas
                return (
                    -1 *
                    Math.sign(Card.piezas.indexOf(_this.number) - Card.piezas.indexOf(other.number))
                );
            }
            if (this.isPieza(sampleCard)) {
                //Solo this es pieza
                return 1;
            }
            //Solo other es pieza
            return -1;
        }

        if (this.isMata() >= 0 || other.isMata() >= 0) {
            if (this.isMata() >= 0 && other.isMata() >= 0) {
                if (this.isMata() < other.isMata()) {
                    return 1;
                }
                return -1;
            }
            if (this.isMata() >= 0) {
                return 1;
            }
            return -1;
        }

        if (Card.normalCards.indexOf(this.number) < Card.normalCards.indexOf(other.number)) {
            return 1;
        } else if (Card.normalCards.indexOf(this.number) > Card.normalCards.indexOf(other.number)) {
            return -1;
        } else {
            return 0;
        }
    }

    public isPieza(sampleCard: Card): boolean {
        if (this.suit !== sampleCard.suit)
            //Distinto palo
            return false;
        if (Card.piezas.includes(this.number))
            //Es pieza normal
            return true;
        if (this.number === 12 && Card.piezas.includes(sampleCard.number))
            //Alcahuete
            return true;
        return false; //Otro caso
    }

    public getPoints(sampleCard: Card): number {
        if (!this.isPieza(sampleCard)) {
            if (this.number >= 10) {
                return 0;
            } else {
                return this.number;
            }
        } else {
            let _this: Card = this;
            if (this.number === 12) {
                _this = sampleCard;
            }
            let index = Card.piezas.indexOf(_this.number);
            if (index <= 3) {
                return 10 - index;
            } else {
                return 7;
            }
        }
    }

    /**
     * @description Verifica si esta carta (this) es mata
     * @returns {number} -1 si no es mata, el índice en el array matas en caso de serlo
     */
    public isMata(): number {
        for (let index = 0; index < Card.matas.length; index++) {
            const mata = Card.matas[index];
            if (this.is(mata)) return index;
        }
        return -1;
    }
    /**
     * @description Verifica si una carta **es** otra
     * @param other Carta a comparar
     */
    public is(other: Card): boolean {
        return this.suit === other.suit && this.number === other.number;
    }

    /**
     * Getter suit
     * @return {Suit}
     */
    public get suit(): Suit {
        return this._suit;
    }

    /**
     * Getter number
     * @return {number}
     */
    public get number(): number {
        return this._number;
    }
}

export { Suit };
