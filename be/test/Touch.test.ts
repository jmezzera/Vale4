import { expect } from "chai";
import Card, { Suit } from "../src/Entities/Card";
import Game from "../src/UseCases/GameUtils";

describe("Envido", () => {
    let game: Game;
    before(() => {
        game = new Game();
    });
    it("Flor", () => {
        const cards = [new Card(Suit.Basto, 1), new Card(Suit.Basto, 4), new Card(Suit.Basto, 7)];
        const sampleCard = new Card(Suit.Oro, 4);
        expect(game.countTouch.bind(game, cards, sampleCard)).to.throw(
            Error,
            "Cannot calculate touch on flower"
        );
    });
    it("Tres negras de distinto palo", () => {
        const cards = [
            new Card(Suit.Basto, 10),
            new Card(Suit.Espada, 10),
            new Card(Suit.Copa, 12),
        ];
        const sampleCard = new Card(Suit.Oro, 4);
        expect(game.countTouch(cards, sampleCard)).to.equal(0);
    });
    it("Tres negras, dos del mismo palo", () => {
        const cards = [
            new Card(Suit.Basto, 10),
            new Card(Suit.Espada, 10),
            new Card(Suit.Basto, 12),
        ];
        const sampleCard = new Card(Suit.Oro, 4);
        expect(game.countTouch(cards, sampleCard)).to.equal(20);
    });
    it("Dos blancas del mismo palo", () => {
        const cards = [new Card(Suit.Basto, 7), new Card(Suit.Espada, 10), new Card(Suit.Basto, 6)];
        const sampleCard = new Card(Suit.Oro, 4);
        expect(game.countTouch(cards, sampleCard)).to.equal(33);
    });
    it("Blanca y negra del mismo palo", () => {
        const cards = [
            new Card(Suit.Basto, 10),
            new Card(Suit.Espada, 10),
            new Card(Suit.Basto, 7),
        ];
        const sampleCard = new Card(Suit.Oro, 4);
        expect(game.countTouch(cards, sampleCard)).to.equal(27);
    });
    it("Pieza y dos negras ", () => {
        const cards = [new Card(Suit.Oro, 10), new Card(Suit.Espada, 10), new Card(Suit.Basto, 12)];
        const sampleCard = new Card(Suit.Oro, 4);
        expect(game.countTouch(cards, sampleCard)).to.equal(27);
    });
    it("Pieza y blanca", () => {
        const cards = [new Card(Suit.Oro, 10), new Card(Suit.Espada, 7), new Card(Suit.Basto, 12)];
        const sampleCard = new Card(Suit.Oro, 4);
        expect(game.countTouch(cards, sampleCard)).to.equal(34);
    });
    it("37", () => {
        const cards = [new Card(Suit.Oro, 2), new Card(Suit.Espada, 7), new Card(Suit.Basto, 12)];
        const sampleCard = new Card(Suit.Oro, 4);
        expect(game.countTouch(cards, sampleCard)).to.equal(37);
    });
});
