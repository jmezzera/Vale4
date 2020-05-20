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
     * @param sampleCard { Card } - Muestra
     * @returns {number} 1: si this es mas grande que other, -1 si other es mas grande que this o 0 si son iguales
     */
    Card.prototype.compareTo = function (other, sampleCard) {
        if (this.isPieza(sampleCard) || other.isPieza(sampleCard)) {
            if (this.isPieza(sampleCard) && other.isPieza(other)) {
                //Las dos son piezas
                //En caso de que alguna de las dos sea el alcahuete, lo intercambio con la muestra
                var _this = this;
                if (this.number === 12) {
                    _this = sampleCard;
                }
                else if (other.number === 12) {
                    other = sampleCard;
                }
                //Me fijo cuál aparece primero en el array piezas
                return (-1 *
                    Math.sign(Card.piezas.indexOf(_this.number) - Card.piezas.indexOf(other.number)));
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
        }
        else if (Card.normalCards.indexOf(this.number) > Card.normalCards.indexOf(other.number)) {
            return -1;
        }
        else {
            return 0;
        }
    };
    Card.prototype.isPieza = function (sampleCard) {
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
    };
    Card.prototype.getPoints = function (sampleCard) {
        if (!this.isPieza(sampleCard)) {
            if (this.number >= 10) {
                return 0;
            }
            else {
                return this.number;
            }
        }
        else {
            var _this = this;
            if (this.number === 12) {
                _this = sampleCard;
            }
            var index = Card.piezas.indexOf(_this.number);
            if (index <= 3) {
                return 10 - index;
            }
            else {
                return 7;
            }
        }
    };
    /**
     * @description Verifica si esta carta (this) es mata
     * @returns {number} -1 si no es mata, el índice en el array matas en caso de serlo
     */
    Card.prototype.isMata = function () {
        for (var index = 0; index < Card.matas.length; index++) {
            var mata = Card.matas[index];
            if (this.is(mata))
                return index;
        }
        return -1;
    };
    /**
     * @description Verifica si una carta **es** otra
     * @param other Carta a comparar
     */
    Card.prototype.is = function (other) {
        return this.suit === other.suit && this.number === other.number;
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
    Card.matas = [
        new Card(Suit.Espada, 1),
        new Card(Suit.Basto, 1),
        new Card(Suit.Espada, 7),
        new Card(Suit.Oro, 7),
    ];
    Card.normalCards = [3, 2, 1, 12, 11, 10, 7, 6, 5, 4];
    Card.getAllCards = function () {
        var allCards = [];
        var suits = [Suit.Copa, Suit.Basto, Suit.Espada, Suit.Oro];
        for (var _i = 0, suits_1 = suits; _i < suits_1.length; _i++) {
            var suit = suits_1[_i];
            for (var _a = 0, _b = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]; _a < _b.length; _a++) {
                var number = _b[_a];
                allCards.push(new Card(suit, number));
            }
        }
        return allCards;
    };
    return Card;
}());
exports.default = Card;
//# sourceMappingURL=Card.js.map