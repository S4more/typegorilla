import { Socket } from "socket.io";
import { getRoomsEvent, joinEvent } from "../events/server_event";
import { IJoinEvent } from "../events/event_interface";

/**
 * Observes all the default events from
 * the sockets registered here.
 */
export function registerDefaultEvents(socket: Socket) {
    socket.on("JoinEvent", (data: IJoinEvent) => joinEvent(socket, data));
    socket.on("GetRoomsEvent", () => getRoomsEvent(socket));
}
