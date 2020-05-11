export default class NotFoundException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = NotFoundException.name;
    }
}
