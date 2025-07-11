import { IBodyMetadata } from "../types/IBodyMetadata";

export function FromBody(): ParameterDecorator {
    return function (target, propertieKey, parameterIndex) {
        const existingParams: IBodyMetadata[] =
            Reflect.getMetadata("body", target, propertieKey as string | symbol) || [];
        existingParams.push({
            index: parameterIndex,
        });

        Reflect.defineMetadata("body", existingParams, target, propertieKey as string | symbol);
    };
}
