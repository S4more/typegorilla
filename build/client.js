"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var event_1 = require("./events/event");
//let allowed_events = [JoinEvent];
var socket = socket_io_client_1.io("http://localhost:3000", {
    path: "/my-custom-path",
    query: { "name": "noah" },
});
var uuid = "1239123";
socket.on("connect", function () {
    console.log("yooo");
    var data = new event_1.JoinEvent(uuid, "Noah");
    socket.emit(event_1.JoinEvent.name, data);
});
