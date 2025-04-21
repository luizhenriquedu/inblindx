import { ActionResult } from "./ActionResult";

export class OkResult extends ActionResult {
    readonly STATUS = 200;
    declare Response: object;
}
