import "reflect-metadata";

const container = new Map();

export function Injectable(target: any) {
    container.set(target, new target());
}

export function Inject(target: any, key: string | symbol | undefined, index: number) {
    const paramTypes = Reflect.getMetadata("design:paramtypes", target);
    Reflect.defineMetadata("inject:paramtypes", paramTypes, target);
}

export function resolve<T>(cls: new (...args: any[]) => T): T {
    const paramTypes = Reflect.getMetadata("inject:paramtypes", cls) || [];
    const dependencies = paramTypes.map((dependency: any) => container.get(dependency) || new dependency());
    return new cls(...dependencies);
}
