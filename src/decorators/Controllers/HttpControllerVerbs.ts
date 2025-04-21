import IRouteDefinition from "../../types/IRouteDefinition";

export function HttpGet(route: string): MethodDecorator {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const routes = (Reflect.getMetadata("routes", target.constructor) as IRouteDefinition[]) || [];
        routes.push({
            method: "get",
            path: route,
            handlerName: key as string,
        });

        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
export function HttpPost(route: string): MethodDecorator {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const routes = (Reflect.getMetadata("routes", target.constructor) as IRouteDefinition[]) || [];
        routes.push({
            method: "post",
            path: route,
            handlerName: key as string,
        });

        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
export function HttpDelete(route: string): MethodDecorator {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const routes = (Reflect.getMetadata("routes", target.constructor) as IRouteDefinition[]) || [];
        routes.push({
            method: "delete",
            path: route,
            handlerName: key as string,
        });

        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
export function HttpPut(route: string): MethodDecorator {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const routes = (Reflect.getMetadata("routes", target.constructor) as IRouteDefinition[]) || [];
        routes.push({
            method: "put",
            path: route,
            handlerName: key as string,
        });

        Reflect.defineMetadata("routes", routes, target.constructor);
    };
}
