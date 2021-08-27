"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomsEvent = exports.joinEvent = void 0;
var users;
/**
 * Fires when an user joins a given room.
 * Notifies everyone except the user that
 * just joined the room.
 */
function joinEvent(socket, data) {
    //TODO remove get rooms listener.
    console.log("Received join event.");
    socket.join(data.room_uuid);
    socket.to(data.room_uuid).emit("JoinEvent", data.user);
}
exports.joinEvent = joinEvent;
function getRoomsEvent(socket) {
    //let room: Room = {uuid: "1", u
    //socket.emit("GetRooms", );
}
exports.getRoomsEvent = getRoomsEvent;
