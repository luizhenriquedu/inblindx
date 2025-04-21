import { Session, SessionData } from "express-session";

export type RequestSession = Session & SessionData & {};
