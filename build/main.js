"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var event_1 = require("./events/event");
var httpServer = http_1.createServer();
var io = new socket_io_1.Server(httpServer, {
    path: "/my-custom-path",
});
io.on("connection", function (socket) {
    socket.on(event_1.JoinEvent.name, function (data) {
        console.log(data);
        console.log(data.sender, data.nickname);
    });
});
httpServer.listen(3000, function () {
    console.log('listening on *:3000');
});
