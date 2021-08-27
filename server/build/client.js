"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
//let allowed_events = [JoinEvent];
var socket = (0, socket_io_client_1.io)("http://localhost:8080");
var uuid = "1239123";
var data = { user: { uuid: uuid, nickname: "leo" }, name: "room 1", max_users: 2 };
socket.on("connect", function () {
    console.log("Connected to the server.");
    socket.emit("CreateRoom", data);
    socket.on("CreatedRoom", function () {
        console.log("Created room successfully");
    });
});
