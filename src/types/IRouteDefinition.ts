import { HttpMethods } from "./HttpVerbType";

export default interface IRouteDefinition {
    method: HttpMethods;
    path: string;
    handlerName: string;
}
