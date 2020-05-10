export default class WrongPasswordException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = WrongPasswordException.name;
    }
}
