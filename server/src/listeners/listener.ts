import { Socket } from "socket.io";
import { createRoomEvent, getRoomsEvent, joinEvent } from "../events/server_event";
import { ICreateRoomEvent, IJoinEvent } from "../events/event_interface";

/**
 * Observes all the default events from
 * the sockets registered here.
 */
export function registerDefaultEvents(socket: Socket) {
    socket.onAny((a: any) => console.log(a));
    socket.on("JoinRoom", (data: IJoinEvent) => joinEvent(socket, data));
    socket.on("CreateRoom", (data: ICreateRoomEvent) => createRoomEvent(socket, data));
    socket.on("GetRooms", () => getRoomsEvent(socket));
}
