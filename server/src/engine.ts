import { Room } from "./entities/room";
import { CustomSocket, RoomSettings } from "../../common";
import { User } from "./entities/user";

export class Engine {
    rooms: Room[] = [];
    connected_sockets: {[socket_id: string]: User} = {}; 

    private findUserBySocketId(socket: CustomSocket): User {
        return this.connected_sockets[socket.id];
    }

    private generateID(): string {
        return Math.floor(Math.random() * 10000).toString();
    }

    joinRoom(socket: CustomSocket, name: string) {
        let room = this.rooms.find(x => x.settings.name == name)

        if (room != undefined) {
            let user = new User(this.generateID(), "default", socket);
            room.addMember(user);
        } else {
            socket.emit("NotFoundRoom");
        }
    }

    createRoom(socket: CustomSocket, settings: RoomSettings) {
        let room = new Room(this.generateID(), settings);
        this.rooms.push(room);
        socket.emit("CreatedRoom", room.getPublicInfo());
    }

    getRooms(socket: CustomSocket) {
        socket.emit("GotRooms", this.rooms.map(x => x.getPublicInfo()));
    }
}

let engine = new Engine();
export {engine};
