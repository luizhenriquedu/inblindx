const controllerRegistry: Object[] = [];

export function registerController(controllerClass: Object) {
    controllerRegistry.push(controllerClass);
}

export function getControllerRegistry() {
    return controllerRegistry;
}
