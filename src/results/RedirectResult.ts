import { ActionResult } from "./ActionResult";

export class RedirectResult extends ActionResult {
    readonly STATUS = 304;
    declare Response: object;
}
