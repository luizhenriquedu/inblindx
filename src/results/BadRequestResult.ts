import { ActionResult } from "./ActionResult";

export class BadRequest extends ActionResult {
    readonly STATUS = 400;
    declare Response: object;
}
