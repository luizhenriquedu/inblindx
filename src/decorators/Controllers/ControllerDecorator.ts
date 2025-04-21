import { Router } from "express";
import "reflect-metadata";
import IRouteDefinition from "./interfaces/IRouteDefinition";
import { registerController } from "../../registry/registryController";
import { ActionResult } from "../../results/ActionResult";
import { BaseError } from "../../results/BaseError";
import { plainToInstance } from "class-transformer";
import { resolve } from "../InjectableDecorator";
export function Controller<T extends { new (...args: any[]): {} }>(route: string) {
    return function (constructor: T) {
        const instance: any = resolve(constructor);
        Reflect.defineMetadata("instance", instance, constructor);

        const router = Router();

        const routes: IRouteDefinition[] = Reflect.getMetadata("routes", constructor);
        for (const { method, path, handlerName } of routes) {
            const fullPath = `${route}/${path}`.replace(/\/+/g, "/");

            const handler = instance[handlerName as keyof typeof instance] as Function;
            const bodyQueries = Reflect.getMetadata("body", constructor.prototype, handlerName) || [];
            const params = Reflect.getMetadata("params", constructor.prototype, handlerName) || [];
            const session = Reflect.getMetadata("session", constructor.prototype, handlerName) || [];
            if (typeof handler === "function") {
                router[method](fullPath, async (req, res) => {
                    const paramTypes = Reflect.getMetadata("design:paramtypes", constructor.prototype, handlerName);

                    const args: any[] = [];
                    for (const param of params) {
                        args[param.index] = req.params[param.name];
                    }

                    for (let x of session) {
                        args[x.index] = req.session;
                    }
                    for (let i = 0; i < bodyQueries.length; i++) {
                        const fromBody = bodyQueries.find((p: any) => p.index == i);
                        if (fromBody) {
                            const type = paramTypes[i];
                            const typeInstance = plainToInstance(type, req.body, {
                                excludeExtraneousValues: true,
                            });
                            args[i] = typeInstance;
                        } else {
                            args[i] = undefined;
                        }
                    }
                    try {
                        const result: ActionResult = await handler.call(instance, ...args);
                        result.execute(res);
                    } catch (e) {
                        if (e instanceof BaseError) {
                            const err = e as BaseError;
                            console.error(e);
                            res.status(err.Status).json(err.Response);
                        }
                    }
                });
            }
        }
        instance.router = router;
        registerController(constructor);
    };
}
