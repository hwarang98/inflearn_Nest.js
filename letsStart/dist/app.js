"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cats_route_1 = require("./cats/cats.route");
const app = express();
class Server {
    constructor() {
        const app = express();
        this.app = app;
    }
    setRoute() {
        this.app.use(cats_route_1.default);
    }
    setMiddleware() {
        this.app.use((req, res, next) => {
            console.log(req.rawHeaders[1]);
            console.log("this is logging middleware");
            next();
        });
        this.app.use(express.json());
        this.setRoute();
        this.app.use((req, res, next) => {
            console.log("this is error middleware");
            res.send({ error: "404 not found error" });
        });
    }
    listen() {
        this.setMiddleware();
        app.listen(8000, () => {
            console.log("server is on...");
        });
    }
}
const init = () => {
    const server = new Server();
    server.listen();
};
init();
//# sourceMappingURL=app.js.map