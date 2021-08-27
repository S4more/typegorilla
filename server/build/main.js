"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var listener_1 = require("./listeners/listener");
var httpServer = http_1.createServer();
var io = new socket_io_1.Server(httpServer, {
    path: "/my-custom-path",
});
io.on("connection", function (socket) {
    listener_1.registerDefaultEvents(socket);
    //...
});
httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});
