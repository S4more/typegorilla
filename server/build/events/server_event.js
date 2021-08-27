"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinEvent = void 0;
/**
 * Fires when an user joins a given room.
 * Notifies everyone except the user that
 * just joined the room.
 */
function joinEvent(socket, data) {
    console.log("Received join event.");
    socket.join(data.room_uuid);
    socket.to(data.room_uuid).emit("JoinEvent", data.user);
}
exports.joinEvent = joinEvent;
