import { ISessionMetadata } from "../types/ISessionMetadata";

export function ReqSession(): ParameterDecorator {
    return function (target, propertieKey, parameterIndex) {
        const session: ISessionMetadata = {
            type: "session",
            index: parameterIndex,
        };

        Reflect.defineMetadata("session", session, target, propertieKey as string | symbol);
    };
}
