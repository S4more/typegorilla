import { Socket } from "socket.io";
import { IJoinEvent, ICreateRoomEvent } from "./event_interface";
import { Room, Response } from "../entities/room";
import { User } from "../entities/user";

export interface Event {
}

let rooms: Room[] = []

/**
 * Fires when an user joins a given room.
 * Notifies everyone except the user that
 * just joined the room.
 */
export function joinEvent(socket: Socket, data: IJoinEvent) {
    console.log("Received join event.");

    let room = rooms.find(x => x.name == data.name)
    if (room != undefined) {
        let user = new User(data.user.uuid, data.user.nickname, socket);
        let response = room.addMember(user);
        switch (response) {
            case (Response.Full): {
                socket.emit("ERROR", "full room");
                break;
            }
            case (Response.Success): {
                socket.emit("JoinedRoom");
                socket.to(data.name).emit("NewUserJoinedRoom");
            }
        }
    }
}

export function createRoomEvent(socket: Socket, data: ICreateRoomEvent) {
    let room = new Room("1", data);
    rooms.push(room);
    let user = new User(data.user.uuid, data.user.nickname, socket);
    room.addMember(user);
    socket.emit("CreatedRoom");
}

export function getRoomsEvent(socket: Socket) {
    console.log("received.");
    socket.emit("GotRooms", rooms);
}
