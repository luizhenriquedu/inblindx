import { Constructor } from "../types/BaseController";
import { ActionResult } from "./ActionResult";
import { BaseError } from "./BaseError";
export default class ApplicationErrorBuilder<T extends BaseError> extends ActionResult {
    readonly STATUS = 500;
    declare Message: string;

    constructor(message: string, errorType: Constructor<T>) {
        super();
        throw new errorType(message, typeof errorType);
    }
}
