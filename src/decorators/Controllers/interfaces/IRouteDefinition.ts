import { HttpMethods } from "../types/HttpVerbType";

export default interface IRouteDefinition {
    method: HttpMethods;
    path: string;
    handlerName: string;
}
