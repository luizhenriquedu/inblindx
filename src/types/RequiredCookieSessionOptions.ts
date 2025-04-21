import { SessionOptions } from "express-session";

export type RequiredCookieSessionOptions = SessionOptions & {
    cookie: NonNullable<SessionOptions["cookie"]>;
};
