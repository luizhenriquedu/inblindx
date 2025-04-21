import { ActionResult } from "./ActionResult";

export class UnauthorizedResult extends ActionResult {
    readonly STATUS = 401;
    declare Response: object;
}
