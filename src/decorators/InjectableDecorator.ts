import "reflect-metadata";
import { BaseController, Constructor } from "../types/BaseController";
import { ClassConstructor } from "class-transformer";

const container = new Map();

export function Injectable<T>(target: Constructor<T>) {
    container.set(target, new target());
}

export function Inject(target: Object, key: string | symbol | undefined, index: number) {
    const paramTypes: ClassConstructor<unknown> = Reflect.getMetadata("design:paramtypes", target);
    Reflect.defineMetadata("inject:paramtypes", paramTypes, target);
}
export function resolve<T extends BaseController>(cls: Constructor<T>): T {
    const paramTypes = (Reflect.getMetadata("inject:paramtypes", cls) || []) as Constructor<unknown>[];
    const dependencies = paramTypes.map((dependency) => container.get(dependency) || new dependency());
    return new cls(...dependencies);
}
