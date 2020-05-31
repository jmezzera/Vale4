"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("../Entities/Card");
var Arrays_1 = require("../Utils/Arrays");
var Table_1 = require("../Entities/Table");
var GameControllerImpl = /** @class */ (function () {
    function GameControllerImpl(tableController) {
        this._tableController = tableController;
        this._tables = new Map();
    }
    /**
     * Este método determina cual de las cartas en mesa es la mayor
     * Retorna
     *          1 si gana una carta del equipo 1
     *          0 si gana una carta del equipo 2
     */
    GameControllerImpl.prototype.compareCardsInTable = function (tableId, cardsInGame, sampleCardInGame) {
        var winnerPlayerIndex;
        var auxCardsInGame = __spreadArrays(cardsInGame);
        var orderArray = cardsInGame.sort(function (cardA, cardB) {
            return cardA.compareTo(cardB, sampleCardInGame);
        });
        winnerPlayerIndex = auxCardsInGame.indexOf(orderArray[orderArray.length - 1]);
        return winnerPlayerIndex;
    };
    GameControllerImpl.prototype.changeShift = function (tableId, winnerPlayerIndex) {
        var currentHand = this._tables.get(tableId).shiftUser;
        var indexCurrentHand = this._tables
            .get(tableId)
            .players.indexOf(currentHand);
        /*console.log("MOVE SAMPLE-->", moveSample);
        if (moveSample) {
            if (
                indexCurrentShuffler + 1 ==
                this._tables.get(tableId).players.length
            ) {
                this._tables.get(tableId).shuffledUser = this._tables.get(
                    tableId
                ).players[0];
                this._tables.get(tableId).shiftUser = this._tables.get(
                    tableId
                ).players[0];
            }
            this._tables.get(tableId).shuffledUser = this._tables.get(
                tableId
            ).players[indexCurrentShuffler + 1];
            this._tables.get(tableId).shiftUser = this._tables.get(
                tableId
            ).players[indexCurrentShuffler + 1];
        } else {*/
        console.log("indexCurrentHand-->", indexCurrentHand);
        if (winnerPlayerIndex != null) {
            this._tables.get(tableId).shiftUser = this._tables.get(tableId).players[winnerPlayerIndex];
        }
        else {
            if (indexCurrentHand + 1 ==
                this._tables.get(tableId).players.length) {
                this._tables.get(tableId).shiftUser = this._tables.get(tableId).players[0];
            }
            else {
                this._tables.get(tableId).shiftUser = this._tables.get(tableId).players[indexCurrentHand + 1];
            }
        }
    };
    /**
     * @param data
     * @param tableId
     * @param user
     * Este método retorna True en caso de tener que volverse a repartir
     */
    GameControllerImpl.prototype.takeGameDecision = function (data, tableId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var searchTable, _createdTables, currentHand, indexCurrentHand, numberOfPlayers, winnerPlayerIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._tables.get(tableId) === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._tableController.getTables()];
                    case 1:
                        _createdTables = _a.sent();
                        _createdTables.filter(function (table) {
                            return table.id === tableId;
                        });
                        _createdTables[0].sampleCardInTable = new Card_1.default(Card_1.Suit.Oro, 2);
                        this._tables.set(tableId, _createdTables[0]);
                        _a.label = 2;
                    case 2:
                        currentHand = this._tables.get(tableId).shiftUser;
                        indexCurrentHand = this._tables
                            .get(tableId)
                            .players.indexOf(currentHand);
                        if (this._tables.get(tableId).cardsInTable === undefined) {
                            this._tables.get(tableId).cardsInTable = new Array();
                        }
                        this._tables
                            .get(tableId)
                            .cardsInTable.splice(indexCurrentHand, 0, data);
                        searchTable = this._tables.get(tableId);
                        numberOfPlayers = searchTable.playersQty;
                        if (searchTable.cardsInTable !== undefined &&
                            searchTable.cardsInTable.length == numberOfPlayers) {
                            winnerPlayerIndex = this.compareCardsInTable(tableId.toString(), searchTable.cardsInTable, searchTable.sampleCardInTable);
                            if (winnerPlayerIndex < searchTable.playersQty / 2) {
                                this._tables.get(tableId).scorerTeam1++;
                            }
                            else {
                                this._tables.get(tableId).scorerTeam2++;
                            }
                            this.changeShift(tableId, winnerPlayerIndex);
                            this._tables.get(tableId).cardsInTable = [];
                            return [2 /*return*/, true];
                        }
                        else {
                            this.changeShift(tableId, null);
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(GameControllerImpl.prototype, "tables", {
        /**
         * Getter tables
         * @return {string}
         */
        get: function () {
            return this._tables;
        },
        /**
         * Setter tables
         * @param {Map<String, Table>} value
         */
        set: function (value) {
            this._tables = value;
        },
        enumerable: true,
        configurable: true
    });
    GameControllerImpl.prototype.shuffleDeck = function (numplayers) {
        var allCards = Card_1.default.getAllCards();
        var cardQty = 3 * numplayers + 1;
        var shuffledCards = Arrays_1.getRandomSubarray(allCards, cardQty);
        var hands = [];
        var index = 0;
        for (var player = 0; player < numplayers; player++) {
            hands.push([
                shuffledCards[index],
                shuffledCards[index + 1],
                shuffledCards[index + 2],
            ]);
            index += 3;
        }
        var sampleCard = shuffledCards[index];
        return { hands: hands, sampleCard: sampleCard };
    };
    GameControllerImpl.prototype.dealCards = function (table) {
        var _a = this.shuffleDeck(table.playersQty), hands = _a.hands, sampleCard = _a.sampleCard;
        for (var index = 0; index < table.playersQty; index++) {
            table.players[index].dealCards(hands[index]);
        }
        table.sampleCardInTable = sampleCard;
        this._tablesConnections.dealCards(table, { hands: hands, sampleCard: sampleCard });
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