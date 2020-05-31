import { expect } from "chai";
import Card, { Suit } from "../src/Entities/Card";
import Game from "../src/UseCases/GameUtils";

describe("Flores", () => {
    let game: Game;
    before(() => {
        game = new Game();
    });
    describe("Es flor", () => {
        it("Tres del mismo palo, muestra de otro palo", () => {
            const cards = [
                new Card(Suit.Basto, 1),
                new Card(Suit.Basto, 4),
                new Card(Suit.Basto, 7),
            ];
            const sampleCard = new Card(Suit.Oro, 4);
            expect(game.validateFlower(cards, sampleCard)).to.be.true;

            const cards2 = [
                new Card(Suit.Copa, 10),
                new Card(Suit.Copa, 7),
                new Card(Suit.Copa, 1),
            ];
            const sampleCard2 = new Card(Suit.Espada, 7);
            expect(game.validateFlower(cards2, sampleCard2)).to.be.true;
        });
        it("Tres del mismo palo, muestra del mismo palo", () => {
            const cards = [
                new Card(Suit.Basto, 1),
                new Card(Suit.Basto, 4),
                new Card(Suit.Basto, 7),
            ];
            const sampleCard = new Card(Suit.Basto, 5);
            expect(game.validateFlower(cards, sampleCard)).to.be.true;

            const cards2 = [
                new Card(Suit.Copa, 10),
                new Card(Suit.Copa, 7),
                new Card(Suit.Copa, 1),
            ];
            const sampleCard2 = new Card(Suit.Copa, 12);
            expect(game.validateFlower(cards2, sampleCard2)).to.be.true;
        });
        it("Tres piezas", () => {
            const cards = [
                new Card(Suit.Basto, 2),
                new Card(Suit.Basto, 4),
                new Card(Suit.Basto, 5),
            ];
            const sampleCard = new Card(Suit.Basto, 10);
            expect(game.validateFlower(cards, sampleCard)).to.be.true;

            const cards2 = [
                new Card(Suit.Copa, 10),
                new Card(Suit.Copa, 11),
                new Card(Suit.Copa, 12),
            ];
            const sampleCard2 = new Card(Suit.Copa, 4);
            expect(game.validateFlower(cards2, sampleCard2)).to.be.true;
        });
        it("2 piezas", () => {
            const cards = [
                new Card(Suit.Basto, 2),
                new Card(Suit.Basto, 4),
                new Card(Suit.Espada, 5),
            ];
            const sampleCard = new Card(Suit.Basto, 10);
            expect(game.validateFlower(cards, sampleCard)).to.be.true;

            const cards2 = [
                new Card(Suit.Copa, 10),
                new Card(Suit.Espada, 7),
                new Card(Suit.Copa, 12),
            ];
            const sampleCard2 = new Card(Suit.Copa, 4);
            expect(game.validateFlower(cards2, sampleCard2)).to.be.true;
        });
        it("1 pieza", () => {
            const cards = [
                new Card(Suit.Basto, 2),
                new Card(Suit.Basto, 4),
                new Card(Suit.Espada, 5),
            ];
            const sampleCard = new Card(Suit.Espada, 10);
            expect(game.validateFlower(cards, sampleCard)).to.be.true;

            const cards2 = [
                new Card(Suit.Espada, 10),
                new Card(Suit.Espada, 7),
                new Card(Suit.Copa, 12),
            ];
            const sampleCard2 = new Card(Suit.Copa, 4);
            expect(game.validateFlower(cards2, sampleCard2)).to.be.true;
        });
    });
    describe("No es flor", () => {
        it("3 de distinto palo, ninguna pieza", () => {
            const cards2 = [
                new Card(Suit.Espada, 10),
                new Card(Suit.Copa, 7),
                new Card(Suit.Basto, 12),
            ];
            const sampleCard2 = new Card(Suit.Oro, 4);
            expect(game.validateFlower(cards2, sampleCard2)).to.be.false;
        });
        it("3 de distinto palo, 1 pieza", () => {
            const cards2 = [
                new Card(Suit.Espada, 10),
                new Card(Suit.Copa, 7),
                new Card(Suit.Basto, 12),
            ];
            const sampleCard2 = new Card(Suit.Espada, 4);
            expect(game.validateFlower(cards2, sampleCard2)).to.be.false;
        });
    });
    describe("Contar flor", () => {
        it("No es flor", () => {
            const cards = [
                new Card(Suit.Espada, 10),
                new Card(Suit.Copa, 7),
                new Card(Suit.Basto, 12),
            ];
            const sampleCard = new Card(Suit.Oro, 4);
            expect(game.countFlower.bind(game, cards, sampleCard)).to.throw(Error, "Not Flower");
        });
        it("Tres del mismo palo, muestra de otro palo", () => {
            const cards = [
                new Card(Suit.Basto, 1),
                new Card(Suit.Basto, 4),
                new Card(Suit.Basto, 7),
            ];
            const sampleCard = new Card(Suit.Oro, 4);
            expect(game.countFlower(cards, sampleCard)).to.equal(32);

            const cards2 = [
                new Card(Suit.Copa, 10),
                new Card(Suit.Copa, 7),
                new Card(Suit.Copa, 1),
            ];
            const sampleCard2 = new Card(Suit.Espada, 7);
            expect(game.countFlower(cards2, sampleCard2)).to.equal(28);
        });
        it("Tres del mismo palo, muestra del mismo palo", () => {
            const cards = [
                new Card(Suit.Basto, 1),
                new Card(Suit.Basto, 4),
                new Card(Suit.Basto, 7),
            ];
            const sampleCard = new Card(Suit.Basto, 5);
            expect(game.countFlower(cards, sampleCard)).to.equal(37);

            const cards2 = [
                new Card(Suit.Copa, 10),
                new Card(Suit.Copa, 7),
                new Card(Suit.Copa, 1),
            ];
            const sampleCard2 = new Card(Suit.Copa, 12);
            expect(game.countFlower(cards2, sampleCard2)).to.equal(35);
        });
        it("Tres piezas", () => {
            const cards = [
                new Card(Suit.Basto, 2),
                new Card(Suit.Basto, 4),
                new Card(Suit.Basto, 5),
            ];
            const sampleCard = new Card(Suit.Basto, 10);
            expect(game.countFlower(cards, sampleCard)).to.equal(47);

            const cards2 = [
                new Card(Suit.Copa, 10),
                new Card(Suit.Copa, 11),
                new Card(Suit.Copa, 12),
            ];
            const sampleCard2 = new Card(Suit.Copa, 4);
            expect(game.countFlower(cards2, sampleCard2)).to.equal(43);
        });
        it("2 piezas", () => {
            const cards = [
                new Card(Suit.Basto, 2),
                new Card(Suit.Basto, 4),
                new Card(Suit.Espada, 5),
            ];
            const sampleCard = new Card(Suit.Basto, 10);
            expect(game.countFlower(cards, sampleCard)).to.equal(44);

            const cards2 = [
                new Card(Suit.Copa, 10),
                new Card(Suit.Espada, 7),
                new Card(Suit.Copa, 12),
            ];
            const sampleCard2 = new Card(Suit.Copa, 4);
            expect(game.countFlower(cards2, sampleCard2)).to.equal(43);
        });
        it("1 pieza", () => {
            const cards = [
                new Card(Suit.Basto, 2),
                new Card(Suit.Basto, 4),
                new Card(Suit.Espada, 5),
            ];
            const sampleCard = new Card(Suit.Espada, 10);
            expect(game.countFlower(cards, sampleCard)).to.equal(34);

            const cards2 = [
                new Card(Suit.Espada, 10),
                new Card(Suit.Espada, 7),
                new Card(Suit.Copa, 12),
            ];
            const sampleCard2 = new Card(Suit.Copa, 4);
            expect(game.countFlower(cards2, sampleCard2)).to.equal(36);
        });
    });
});
