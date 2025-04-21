import { ActionResult } from "./ActionResult";

export class NotFoundResult extends ActionResult {
    readonly STATUS = 404;
    declare Response: object;
}
