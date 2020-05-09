export default class MissingDataException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = MissingDataException.name;
    }
}
