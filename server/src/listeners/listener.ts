import { CustomSocket, RoomSettings } from "../../../common";
import { engine } from "../engine";

/**
 * Observes all the default events from
 * the sockets registered here.
 */
export function registerDefaultEvents(socket: CustomSocket) {
    socket.onAny((a: any) => console.log(a));
    socket.on("JoinRoom", (data: string) => engine.joinRoom(socket, data));
    socket.on("CreateRoom", (data: RoomSettings) => engine.createRoom(socket, data));
    socket.on("GetRooms", () => engine.getRooms(socket));
}
