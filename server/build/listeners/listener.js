"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDefaultEvents = void 0;
var engine_1 = require("../engine");
/**
 * Observes all the default events from
 * the sockets registered here.
 */
function registerDefaultEvents(socket) {
    socket.onAny(function (a) { return console.log(a); });
    socket.on("JoinRoom", function (data) { return engine_1.engine.joinRoom(socket, data); });
    socket.on("CreateRoom", function (data) { return engine_1.engine.createRoom(socket, data); });
    socket.on("GetRooms", function () { return engine_1.engine.getRooms(socket); });
}
exports.registerDefaultEvents = registerDefaultEvents;
