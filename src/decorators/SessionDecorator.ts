export function ReqSession(): ParameterDecorator {
    return function (target, propertieKey, parameterIndex) {
        const session = Reflect.getMetadata("session", target, propertieKey as string | symbol) || [];
        session.push({
            type: "session",
            index: parameterIndex,
        });

        Reflect.defineMetadata("session", session, target, propertieKey as string | symbol);
    };
}
