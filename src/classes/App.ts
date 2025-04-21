import express from "express";
import { ServiceCollection } from "./ServiceCollection";

export class App {
    readonly express = express();
    readonly Services = new ServiceCollection(this.express);
}
