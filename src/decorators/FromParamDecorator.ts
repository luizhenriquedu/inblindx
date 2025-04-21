import { IParamMetadata } from "../types/IParamMetadata";

export function FromParam(prop: string): ParameterDecorator {
    return function (target, propertieKey, parameterIndex) {
        const existingParams: IParamMetadata[] =
            Reflect.getMetadata("params", target, propertieKey as string | symbol) || [];
        existingParams.push({
            name: prop,
            type: "param",
            index: parameterIndex,
        });

        Reflect.defineMetadata("params", existingParams, target, propertieKey as string | symbol);
    };
}
