export default class MissingPasswordException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = MissingPasswordException.name;
    }
}
