"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var listener_1 = require("./listeners/listener");
var engine_1 = require("./engine");
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
// Sorry Noah. This is cursed but it's the only solution
// that I found.
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    (0, listener_1.registerDefaultEvents)(socket);
    //...
});
engine_1.engine.start(io);
app.get('/*', function (req, res) {
    res.sendFile(req.path, { root: __dirname + "../../../client/dist" });
});
server.listen(8080, function () {
    console.log('listening on *:8080');
});
