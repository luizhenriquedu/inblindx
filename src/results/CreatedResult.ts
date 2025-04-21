import { ActionResult } from "./ActionResult";

export class CreatedResult extends ActionResult {
    readonly STATUS = 201;
    declare Response: object;
}
