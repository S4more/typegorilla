"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
//let allowed_events = [JoinEvent];
var socket = socket_io_client_1.io("http://localhost:3000", {
    path: "/my-custom-path",
    query: { "name": "noah" },
});
var uuid = "1239123";
var data = { user: { uuid: uuid, nickname: "leo" }, room_uuid: "123" };
socket.on("connect", function () {
    console.log("Connected to the server.");
    socket.emit("JoinEvent", data);
    socket.on("JoinEvent", function (data) {
        console.log(data.nickname + " joined your match.");
    });
});
