export abstract class BaseError extends Error {
    abstract Status: number;
    Response: object = {};
    constructor(message: string, name: string) {
        super(message);
        this.name = name;
    }
}
