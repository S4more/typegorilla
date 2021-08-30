"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDefaultEvents = void 0;
var server_event_1 = require("../events/server_event");
/**
 * Observes all the default events from
 * the sockets registered here.
 */
function registerDefaultEvents(socket) {
    socket.onAny(function (a) { return console.log(a); });
    socket.on("JoinRoom", function (data) { return (0, server_event_1.joinEvent)(socket, data); });
    socket.on("CreateRoom", function (data) { return (0, server_event_1.createRoomEvent)(socket, data); });
    socket.on("GetRooms", function () { return (0, server_event_1.getRoomsEvent)(socket); });
}
exports.registerDefaultEvents = registerDefaultEvents;
