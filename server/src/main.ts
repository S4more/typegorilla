import { createServer } from "http";
import { Server} from "socket.io";
import { registerDefaultEvents } from "./listeners/listener";
import { CustomServer, CustomSocket } from "../../common";
import { engine } from "./engine";
import express from 'express';

const app = express();
const server = createServer(app);
// Sorry Noah. This is cursed but it's the only solution
// that I found.
const io = <unknown>new Server(server) as CustomServer;

io.on("connection", (socket: CustomSocket) => {
    registerDefaultEvents(socket);

    //...
});

engine.start(io);

app.get('/*', (req, res) => {
    res.sendFile(req.path, {root: __dirname + "../../../client/dist"});
});
server.listen(8080, () => {
    console.log('listening on *:8080');
});

