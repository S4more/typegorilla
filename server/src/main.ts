import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { registerDefaultEvents } from "./listeners/listener";


const httpServer = createServer();
const io = new Server(httpServer, {
    path: "",
});


io.on("connection", (socket: Socket) => {
    registerDefaultEvents(socket);
    //...
});

httpServer.listen(8080, () => {
    console.log('listening on *:8080');
});