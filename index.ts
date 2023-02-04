import Express from "express";
import Ws from "ws";
import Http from "http";

const PORT = 8888;

function main() {
	let server = start_server();	
	let wss = start_ws(server);
}

function start_server(): Http.Server {
	let app = Express();

	app.get("/", (_, res) => {
		res.end("Hello!");
	});

	let	server = app.listen(PORT, () => {
		console.log("ready");
	});

	return server;
}

function start_ws(server: Http.Server) {
	let wss = new Ws.WebSocketServer({
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
