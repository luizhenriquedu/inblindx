# An ASP.NET Core based development library (with express)

---

## Features

-   Controller Decorator (route controllers)
-   HttpVerb Decorator
-   FromBody, Params, Etc
-   Auto controller loading (need to be at src/controller)
-   Auto config loader (dotenv and json)
-   Session, AddSession, with cookie based auth (using express-session, you can also extends the session type)
-   Dependency injection
-   Results

---

## Usage examples

```ts
import { App, Type, RequestSession } from "inblindx";
import AppConfig from "./config/AppConfig";

class AppConfig {
    @Type("number")
    declare port: number;
}

function main() {
    const app = new App();
    const config = app.Services.AddConfigLoader<AppConfig>(AppConfig).AddDotEnvConfig().Build();

    app.Services.AddControllers(app.express);
    app.Services.AddSession("secret", (x) => {
        x.cookie.maxAge = 1000 * 60 * 60;
    });

    app.express.listen(config.port, () => {
        console.log(`Online on port ${config.port}`);
    });
}

main();
```

src/controllers/UserController.ts

```ts
import { Controller, FromParam, HttpGet, ReqSession, Results, BaseController } from "inblindx";
import { UserSession } from "../SessionExtension";
import { Inject } from "inblindx/dist/decorators/InjectableDecorator";
import UserService from "../services/UserService";

export type UserSession = RequestSession & {
    userId: number;
};

@Controller("/user")
class UserController extends BaseController {
    constructor(@Inject private userService: UserService) {
        super();
    }
    @HttpGet("get/:id")
    logInConsole(@FromParam("id") id: number, @ReqSession() session: UserSession) {
        session.userId = id;
        this.userService.logUserIdBySession(session.userId);
        return Results.Ok({
            message: id,
        });
    }
    @HttpGet("getId")
    returnId(@ReqSession() session: UserSession) {
        return Results.Ok({
            message: session.userId,
        });
    }
}
```

src/services/UserServices.ts

```ts
import { Injectable } from "inblindx";

@Injectable
export default class UserService {
    logUserIdBySession(id: number) {
        console.log(id);
    }
}
```

this is a pretty simple example of the library use

### Dependencies

-   express
-   dotenv
-   express-session
-   class-transform
-   glob
-   cookie-parser
-   reflect-metadata

(the library will have severe updates)
