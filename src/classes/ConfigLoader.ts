import { config, parse } from "dotenv";
import { existsSync, readFileSync } from "fs";
export class ConfigLoader<T extends Record<string, any>> {
    private configs: Record<string, any>;

    constructor(private configClass: new () => T) {
        this.configs = new configClass();
    }

    public AddJsonConfig(path: string = process.cwd() + "/config.json") {
        if (existsSync(path)) {
            const config: T = require(path);
            this.configs = config;
            return this;
        }
        return this;
    }

    public AddDotEnvConfig(path: string = process.cwd() + "/.env") {
        if (!existsSync(path)) return this;
        const envContent = readFileSync(path, { encoding: "utf-8" });
        const configParsed = parse(envContent);
        for (let key in configParsed) {
            const raw = configParsed[key];
            if (raw !== undefined) {
                const type = Reflect.getMetadata(key.toLowerCase(), this.configClass.prototype);
                const camelCase = key.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                this.configs[camelCase] = this.convertValue(raw, type);
            }
        }
        return this;
    }

    public LoadDotEnvToProcess(path: string = process.cwd + "/.env") {
        config({
            path,
        });
    }

    public Build(): T {
        return this.configs as T;
    }

    private convertValue(value: string, type: "string" | "number" | "boolean"): any {
        switch (type) {
            case "number":
                return Number(value);
            case "boolean":
                return value === "true";
            default:
                return value;
        }
    }
}
