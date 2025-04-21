import { Router } from "express";
export abstract class BaseController {
    public declare router: Router;
    constructor(..._: unknown[]) {}
}

export type Constructor<T> = new (...args: any[]) => T;
