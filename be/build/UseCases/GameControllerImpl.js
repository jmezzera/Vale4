"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("../Entities/Card");
var Arrays_1 = require("../Utils/Arrays");
var Table_1 = require("../Entities/Table");
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
    GameControllerImpl.prototype.dealCards = function (table) {
        var hands = this.shuffleDeck(table.playersQty);
        for (var index = 0; index < table.playersQty; index++) {
            table.players[index].dealCards(hands.hands[index]);
        }
        this._tablesConnections.dealCards(table, hands);
        table.state = Table_1.TableSate.AWAITING_CARD;
    };
    Object.defineProperty(GameControllerImpl.prototype, "tablesConnection", {
        set: function (tablesConnection) {
            this._tablesConnections = tablesConnection;
        },
        enumerable: true,
        configurable: true
    });
    return GameControllerImpl;
}());
exports.default = GameControllerImpl;
//# sourceMappingURL=GameControllerImpl.js.map