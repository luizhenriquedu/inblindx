import { Response } from "express";

export abstract class ActionResult {
    declare STATUS: number;
    declare Response: object;

    constructor(response: object = {}) {
        this.Response = response;
    }
    execute(res: Response) {
        res.status(this.STATUS).json(this.Response);
    }
}
