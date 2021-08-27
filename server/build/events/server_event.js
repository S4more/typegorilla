"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomsEvent = exports.createRoomEvent = exports.joinEvent = void 0;
var room_1 = require("../entities/room");
var user_1 = require("../entities/user");
var rooms = [];
/**
 * Fires when an user joins a given room.
 * Notifies everyone except the user that
 * just joined the room.
 */
function joinEvent(socket, data) {
    console.log("Received join event.");
    var room = rooms.find(function (x) { return x.name == data.name; });
    if (room != undefined) {
        var user = new user_1.User(data.user.uuid, data.user.nickname, socket);
        var response = room.addMember(user);
        switch (response) {
            case (room_1.Response.Full): {
                socket.emit("ERROR", "full room");
                break;
            }
            case (room_1.Response.Success): {
                socket.emit("JoinedRoom");
            }
        }
    }
}
exports.joinEvent = joinEvent;
function createRoomEvent(socket, data) {
    var room = new room_1.Room("1", data);
    rooms.push(room);
    var user = new user_1.User(data.user.uuid, data.user.nickname, socket);
    room.addMember(user);
    socket.emit("CreatedRoom");
    console.log("Create room");
}
exports.createRoomEvent = createRoomEvent;
function getRoomsEvent(socket) {
    socket.emit("GotRooms", rooms);
}
exports.getRoomsEvent = getRoomsEvent;
