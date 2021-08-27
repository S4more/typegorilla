import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { registerDefaultEvents } from "./listeners/listener";
import express from 'express';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
    registerDefaultEvents(socket);
    //...
});

app.get('/*', (req, res) => {
    res.sendFile(req.path, {root: __dirname + "../../../client/dist"});
});
server.listen(8080, () => {
    console.log('listening on *:8080');
});

