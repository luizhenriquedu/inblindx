import { getControllerRegistry } from "../registry/registryController";
import { glob } from "glob";
import { Express } from "express";
import { ConfigLoader } from "./ConfigLoader";
import session from "express-session";
import { RequiredCookieSessionOptions } from "../types/RequiredCookieSessionOptions";

export class ServiceCollection {
    constructor(private express: Express) {}
    AddControllers(app: Express) {
        this.loadControllers().then(() => {
            const controllers = getControllerRegistry();
            for (const controllerClass of controllers) {
                const instance = Reflect.getMetadata("instance", controllerClass);
                app.use(instance.router);
            }
        });
    }

    private async loadControllers() {
        const files = await glob(process.cwd() + "/src/controllers/**/*", { absolute: true });
        for (const file of files) {
            if (file.endsWith(".ts") || file.endsWith(".js")) {
                require(file);
            }
        }
    }
    public AddConfigLoader<T extends object>(protClass: new () => T) {
        return new ConfigLoader<T>(protClass);
    }

    AddSession(secret: string, configure?: (options: RequiredCookieSessionOptions) => void) {
        const options: RequiredCookieSessionOptions = {
            secret: secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60,
            },
        };
        if (configure) {
            configure(options);
        }

        this.express.use(session(options));
    }
}
