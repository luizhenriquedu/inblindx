import "reflect-metadata";

export function Type(type: string): PropertyDecorator {
    return function (target: Object, propertyKey: string | symbol) {
        Reflect.defineMetadata(propertyKey, type, target);
    };
}
