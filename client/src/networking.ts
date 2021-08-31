import { io, Socket } from "socket.io-client";
import { 
    PublicRoom, 
    RoomSettings,
    ServerToClientEvents,
    ClientToServerEvents
} from "../../common";

class Networking {
    readonly socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8080");

    constructor() {
        this.socket.on("connect", () => {
            console.log("socket connected.");
        });
    }

    async getGames() : Promise<PublicRoom[]> {
        this.socket.emit("GetRooms");
        return await new Promise (resolve => {
            this.socket.once("GotRooms", (gameList: PublicRoom[]) => resolve(gameList));
        });
    }

    async joinGame(id: string) : Promise<PublicRoom> {
        this.socket.emit('JoinGame', id);
        return await new Promise(resolve => {
            this.socket.once('JoinedGame', (room: PublicRoom) => resolve(room));
        });
    }

    async createRoom(settings: RoomSettings): Promise<string> {
        this.socket.emit('CreateRoom', settings);
        return await new Promise(resolve => {
            this.socket.once('CreatedRoom', (id: string) => resolve(id));
        });
    }
}

export default new Networking;
