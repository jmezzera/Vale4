import { expect } from "chai";
import Card, { Suit } from "../src/Entities/Card";

describe("Test piezas", () => {
    describe("Son piezas", () => {
        it("Piezas comunes", () => {
            const muestra = new Card(Suit.Oro, 6);

            expect(new Card(Suit.Oro, 2).isPieza(muestra)).to.be.true;
            expect(new Card(Suit.Oro, 4).isPieza(muestra)).to.be.true;
            expect(new Card(Suit.Oro, 5).isPieza(muestra)).to.be.true;
            expect(new Card(Suit.Oro, 11).isPieza(muestra)).to.be.true;
            expect(new Card(Suit.Oro, 10).isPieza(muestra)).to.be.true;
        });
        it("Alcahuete", () => {
            const muestra = new Card(Suit.Oro, 5);

            expect(new Card(Suit.Oro, 12).isPieza(muestra)).to.be.true;
        });
    });
    describe("No son piezas", () => {
        it("Distinto palo", () => {
            const muestra = new Card(Suit.Oro, 6);

            expect(new Card(Suit.Basto, 2).isPieza(muestra)).to.be.false;
            expect(new Card(Suit.Espada, 4).isPieza(muestra)).to.be.false;
            expect(new Card(Suit.Copa, 5).isPieza(muestra)).to.be.false;
        });
        it("Alcahuete de distinto palo", () => {
            const muestra = new Card(Suit.Oro, 5);

            expect(new Card(Suit.Espada, 12).isPieza(muestra)).to.be.false;
        });
        it("Mismo palo, número que no es pieza", () => {
            const muestra = new Card(Suit.Oro, 5);

            expect(new Card(Suit.Oro, 6).isPieza(muestra)).to.be.false;
            expect(new Card(Suit.Oro, 7).isPieza(muestra)).to.be.false;
            expect(new Card(Suit.Oro, 1).isPieza(muestra)).to.be.false;
        });
    });
});

describe("Test matas", () => {
    it("Son matas", () => {
        expect(new Card(Suit.Espada, 1).isMata() >= 0).to.be.true;
        expect(new Card(Suit.Basto, 1).isMata() >= 0).to.be.true;
        expect(new Card(Suit.Espada, 7).isMata() >= 0).to.be.true;
        expect(new Card(Suit.Oro, 7).isMata() >= 0).to.be.true;
    });
    it("No son matas", () => {
        expect(new Card(Suit.Espada, 2).isMata() >= 0).to.be.false;
        expect(new Card(Suit.Basto, 4).isMata() >= 0).to.be.false;
        expect(new Card(Suit.Basto, 7).isMata() >= 0).to.be.false;
        expect(new Card(Suit.Copa, 7).isMata() >= 0).to.be.false;
        expect(new Card(Suit.Copa, 1).isMata() >= 0).to.be.false;
    });
});

describe("Test comparación", () => {
    it("Pieza con pieza", () => {
        expect(
            new Card(Suit.Oro, 2).compareTo(new Card(Suit.Oro, 4), new Card(Suit.Oro, 7))
        ).to.equal(1);
        expect(
            new Card(Suit.Oro, 5).compareTo(new Card(Suit.Oro, 4), new Card(Suit.Oro, 7))
        ).to.equal(-1);
        expect(
            new Card(Suit.Oro, 12).compareTo(new Card(Suit.Oro, 4), new Card(Suit.Oro, 2))
        ).to.equal(1);
        expect(
            new Card(Suit.Oro, 12).compareTo(new Card(Suit.Oro, 4), new Card(Suit.Oro, 5))
        ).to.equal(-1);
    });
    it("Pieza con mata", () => {
        expect(
            new Card(Suit.Oro, 2).compareTo(new Card(Suit.Espada, 7), new Card(Suit.Oro, 7))
        ).to.equal(1);
        expect(
            new Card(Suit.Espada, 1).compareTo(new Card(Suit.Oro, 4), new Card(Suit.Oro, 7))
        ).to.equal(-1);
        expect(
            new Card(Suit.Oro, 12).compareTo(new Card(Suit.Basto, 1), new Card(Suit.Oro, 2))
        ).to.equal(1);
    });
    it("Mata con mata", () => {
        expect(
            new Card(Suit.Espada, 1).compareTo(new Card(Suit.Oro, 7), new Card(Suit.Oro, 4))
        ).to.equal(1);
        expect(
            new Card(Suit.Espada, 7).compareTo(new Card(Suit.Basto, 1), new Card(Suit.Oro, 7))
        ).to.equal(-1);
        expect(
            new Card(Suit.Espada, 1).compareTo(new Card(Suit.Basto, 1), new Card(Suit.Oro, 2))
        ).to.equal(1);
    });
    it("Mata con normal", () => {
        expect(
            new Card(Suit.Espada, 1).compareTo(new Card(Suit.Oro, 6), new Card(Suit.Oro, 4))
        ).to.equal(1);
        expect(
            new Card(Suit.Espada, 4).compareTo(new Card(Suit.Basto, 1), new Card(Suit.Oro, 7))
        ).to.equal(-1);
        expect(
            new Card(Suit.Espada, 1).compareTo(new Card(Suit.Basto, 10), new Card(Suit.Oro, 2))
        ).to.equal(1);
    });
    it("Pieza con normal", () => {
        expect(
            new Card(Suit.Oro, 2).compareTo(new Card(Suit.Espada, 4), new Card(Suit.Oro, 7))
        ).to.equal(1);
        expect(
            new Card(Suit.Copa, 12).compareTo(new Card(Suit.Oro, 4), new Card(Suit.Oro, 7))
        ).to.equal(-1);
        expect(
            new Card(Suit.Oro, 12).compareTo(new Card(Suit.Espada, 11), new Card(Suit.Oro, 2))
        ).to.equal(1);
    });
    it("Normal con normal", () => {
        expect(
            new Card(Suit.Espada, 5).compareTo(new Card(Suit.Espada, 4), new Card(Suit.Oro, 7))
        ).to.equal(1);
        expect(
            new Card(Suit.Oro, 1).compareTo(new Card(Suit.Oro, 3), new Card(Suit.Oro, 7))
        ).to.equal(-1);
        expect(
            new Card(Suit.Oro, 1).compareTo(new Card(Suit.Espada, 12), new Card(Suit.Oro, 2))
        ).to.equal(1);
        expect(
            new Card(Suit.Oro, 1).compareTo(new Card(Suit.Copa, 1), new Card(Suit.Oro, 2))
        ).to.equal(0);
        expect(
            new Card(Suit.Basto, 4).compareTo(new Card(Suit.Espada, 4), new Card(Suit.Oro, 2))
        ).to.equal(0);
    });
});
