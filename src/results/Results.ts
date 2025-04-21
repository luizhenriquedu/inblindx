import ApplicationError from "./ApplicationError";
import { BaseError } from "./BaseError";
import { CreatedResult } from "./CreatedResult";
import { NotFoundResult } from "./NotFoundResult";
import { OkResult } from "./OkResult";
import { RedirectResult } from "./RedirectResult";
import { UnauthorizedResult } from "./UnauthorizedResult";
import { BadRequest } from "./BadRequestResult";
import { Constructor } from "../types/BaseController";
export const Results = {
    Ok: (data: object = {}) => new OkResult(data),
    Created: (data: object = {}) => new CreatedResult(data),
    Unauthorized: (data: object = {}) => new UnauthorizedResult(data),
    NotFound: (data: object = {}) => new NotFoundResult(data),
    Error: (message: string, type: Constructor<BaseError>) => new ApplicationError(message, type),
    Redirect: (data: object = {}) => new RedirectResult(data),
    BadRequest: (data: object = {}) => new BadRequest(data),
};
