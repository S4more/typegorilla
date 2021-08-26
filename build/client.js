"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var socket = socket_io_client_1.io("http://localhost:3000", {
    path: "/my-custom-path"
});
