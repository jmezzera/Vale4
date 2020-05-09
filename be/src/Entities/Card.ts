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

    constructor(suit: Suit, number: number) {
        this._suit = suit;
        this._number = number;
    }

    /**
     * @param other { Card } - Carta para comparar
     * @param tableCard { Card } - Muestra
     * @returns {number} 1: si this es mas grande que other, -1 si other es mas grande que this o 0 si son iguales
     */
    public compareTo(other: Card, tableCard: Card): number {
        if (this.isPieza(tableCard) || other.isPieza(tableCard)) {
            if (this.isPieza(tableCard) && other.isPieza(other)) {
                //Las dos son piezas
                //En caso de que alguna de las dos sea el alcahuete, lo intercambio con la muestra
                let _this: Card = this;
                if (this.number === 12) {
                    let tmp = tableCard;
                    tableCard = this;
                    _this = tmp;
                }
                if (other.number === 12) {
                    let tmp = tableCard;
                    tableCard = other;
                    other = tmp;
                }
                //Me fijo cuál aparece primero en el array piezas
                return (
                    -1 *
                    Math.sign(Card.piezas.indexOf(_this.number) - Card.piezas.indexOf(other.number))
                );
            }
            if (this.isPieza(tableCard)) {
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

    public isPieza(tableCard: Card): boolean {
        if (this.suit !== tableCard.suit)
            //Distinto palo
            return false;
        if (Card.piezas.includes(this.number))
            //Es pieza normal
            return true;
        if (this.number === 12 && Card.piezas.includes(tableCard.number))
            //Alcahuete
            return true;
        return false; //Otro caso
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
