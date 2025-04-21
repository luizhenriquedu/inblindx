const controllerRegistry: any[] = [];

export function registerController(controllerClass: Object) {
    controllerRegistry.push(controllerClass);
}

export function getControllerRegistry() {
    return controllerRegistry;
}
