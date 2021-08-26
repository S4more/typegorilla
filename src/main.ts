import { createServer } from "http"
import { Server, Socket } from "socket.io"

const httpServer = createServer();
const io = new Server(httpServer, {
    path: "/my-custom-path",
});

io.on("connection", (socket: Socket) => {
    console.log("Connected!");
});

httpServer.listen(3000, () => {
    console.log('listening on *:3000');
});
