"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDefaultEvents = void 0;
var server_event_1 = require("../events/server_event");
/**
 * Observes all the default events from
 * the sockets registered here.
 */
function registerDefaultEvents(socket) {
    socket.on("JoinEvent", function (data) { return server_event_1.joinEvent(socket, data); });
}
exports.registerDefaultEvents = registerDefaultEvents;
