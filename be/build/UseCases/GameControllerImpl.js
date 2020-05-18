"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("../Entities/Card");
var Arrays_1 = require("../Utils/Arrays");
var GameControllerImpl = /** @class */ (function () {
    function GameControllerImpl() {
    }
    GameControllerImpl.prototype.shuffleDeck = function (numplayers) {
        var allCards = Card_1.default.getAllCards();
        var cardQty = 3 * numplayers + 1;
        var shuffledCards = Arrays_1.getRandomSubarray(allCards, cardQty);
        var hands = [];
        var index = 0;
        for (var player = 0; player < numplayers; player++) {
            hands.push([shuffledCards[index], shuffledCards[index + 1], shuffledCards[index + 2]]);
            index += 3;
        }
        var sampleCard = shuffledCards[index];
        return { hands: hands, sampleCard: sampleCard };
    };
    return GameControllerImpl;
}());
exports.default = GameControllerImpl;
//# sourceMappingURL=GameControllerImpl.js.map