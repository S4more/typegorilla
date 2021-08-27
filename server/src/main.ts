import express, { Application} from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/*', (req, res) => {
  res.sendFile(req.path, {root: __dirname + "../../../client/dist"});
});

io.on('connection', (socket: Socket) => {
  console.log("a user connected");
  socket.on("message", function(message: any) {
    console.log("message:" + message);
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
