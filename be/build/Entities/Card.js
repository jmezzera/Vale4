"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suit;
(function (Suit) {
    Suit[Suit["Copa"] = 0] = "Copa";
    Suit[Suit["Basto"] = 1] = "Basto";
    Suit[Suit["Espada"] = 2] = "Espada";
    Suit[Suit["Oro"] = 3] = "Oro";
})(Suit || (Suit = {}));
exports.Suit = Suit;
var Card = /** @class */ (function () {
    function Card(suit, number) {
        this._suit = suit;
        this._number = number;
    }
    /**
     * @param other { Card } - Carta para comparar
     * @param tableCard { Card } - Muestra
     * @returns {number} 1: si this es mas grande que other, -1 si other es mas grande que this o 0 si son iguales
     */
    Card.prototype.compareTo = function (other, tableCard) {
        throw new Error("Not implemented");
    };
    Card.isPieza = function (card, tableCard) {
        if (card.suit !== tableCard.suit)
            //Distinto palo
            return false;
        if (Card.piezas.includes(card.number))
            //Es pieza normal
            return true;
        if (card.number === 12 && Card.piezas.includes(tableCard.number))
            //Alcahuete
            return true;
        return false; //Otro caso
    };
    Object.defineProperty(Card.prototype, "suit", {
        /**
         * Getter suit
         * @return {Suit}
         */
        get: function () {
            return this._suit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "number", {
        /**
         * Getter number
         * @return {number}
         */
        get: function () {
            return this._number;
        },
        enumerable: true,
        configurable: true
    });
    Card.piezas = [2, 4, 5, 11, 10];
    return Card;
}());
exports.default = Card;
//# sourceMappingURL=Card.js.map