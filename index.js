"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const child_process_1 = __importDefault(require("child_process"));
const PORT = 8888;
function main() {
    let server = start_server();
    let wss = start_ws(server);
    let process = child_process_1.default.exec("./greet");
    process.stdout?.on("data", (data) => {
        console.log(data.toString());
    });
}
function start_server() {
    let app = (0, express_1.default)();
    app.get("/", (_, res) => {
        res.end("Hello!");
    });
    let server = app.listen(PORT, () => {
        console.log("ready");
    });
    return server;
}
function start_ws(server) {
    let wss = new ws_1.default.WebSocketServer({
        server: server,
    });
    wss.on("connection", (ws, _) => {
        ws.on("message", (msg) => {
            ws.send(`"${msg}" back.`);
        });
    });
    return wss;
}
main();
