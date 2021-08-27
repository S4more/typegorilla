import { Socket } from "socket.io";
import { IJoinEvent } from "./event_interface";
import { Room } from "../entities/room";
import { User } from "../entities/user";

export interface Event {
}

let users: User;

/**
 * Fires when an user joins a given room.
 * Notifies everyone except the user that
 * just joined the room.
 */
export function joinEvent(socket: Socket, data: IJoinEvent) {
    //TODO remove get rooms listener.
    console.log("Received join event.");
    socket.join(data.room_uuid);
    socket.to(data.room_uuid).emit("JoinEvent", data.user);
}

export function getRoomsEvent(socket: Socket) {
    //let room: Room = {uuid: "1", u
    //socket.emit("GetRooms", );
}
