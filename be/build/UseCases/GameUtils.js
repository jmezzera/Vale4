"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("../Entities/Card");
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.validateFlower = function (cards, sampleCard) {
        if (cards.length !== 3) {
            throw new Error("Cards array must contain 3 cards");
        }
        //Las tres del mismo palo
        if (cards[0].suit === cards[1].suit && cards[0].suit === cards[2].suit)
            return true;
        var piecesQty = cards
            .map(function (card) { return card.isPieza(sampleCard); })
            .reduce(function (prev, curr) {
            if (curr) {
                prev++;
            }
            return prev;
        }, 0);
        if (piecesQty >= 2) {
            //Nunca va a ser 3 porque entonces serian las tres del mismo palo. Igual se deja la desigualdad por claridad
            return true;
        }
        else if (piecesQty === 1) {
            var otherCards = cards.filter(function (card) { return !card.isPieza(sampleCard); });
            //otherCards sí o sí es un array de 2 elementos (a tres cartas se le saca 1)
            return otherCards[0].suit === otherCards[1].suit;
        }
        else
            return false; //Ya se descartó el caso de 3 del mismo palo
    };
    Game.prototype.countTouch = function (cards, sampleCard) {
        if (this.validateFlower(cards, sampleCard)) {
            throw new Error("Cannot calculate touch on flower");
        }
        var piece = cards.find(function (card) { return card.isPieza(sampleCard); });
        if (piece) {
            var notPieces = cards.filter(function (card) { return !card.isPieza(sampleCard); });
            //notPieces tiene largo 2. Hay mínimo una pieza (el if lo verifica) y máximo 1 pieza (si hubiera más sería flor)
            var biggestCard = Math.max(notPieces[0].getPoints(sampleCard), notPieces[1].getPoints(sampleCard));
            return 20 + piece.getPoints(sampleCard) + biggestCard;
        }
        var suitsQtys = cards
            .map(function (card) { return card.suit; })
            .reduce(function (prev, curr) {
            if (prev[Card_1.Suit[curr]]) {
                prev[Card_1.Suit[curr]]++;
            }
            else {
                prev[Card_1.Suit[curr]] = 1;
            }
            return prev;
        }, {});
        if (Math.max.apply(Math, Object.values(suitsQtys)) === 2) {
            var suitName_1 = Object.keys(suitsQtys).find(function (suitName) { return suitsQtys[suitName] === 2; });
            var cardsOfThatSuit = cards.filter(function (card) { return card.suit === Card_1.Suit[suitName_1]; });
            return (20 +
                cardsOfThatSuit[0].getPoints(sampleCard) +
                cardsOfThatSuit[1].getPoints(sampleCard));
        }
        else {
            //Todas de distinto palo
            return Math.max.apply(Math, cards.map(function (card) { return card.getPoints(sampleCard); }));
        }
    };
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=GameUtils.js.map