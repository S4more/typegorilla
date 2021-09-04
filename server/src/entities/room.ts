import { User } from "./user";
import { CustomServer, PublicRoom, RoomSettings } from "../../../common";

export class Room {
    users: User[] = [];
    settings: RoomSettings;
    active: boolean = true;

    indexes: {[user_id: string]: number} = {};

    constructor(readonly id: string, settings: RoomSettings) {
        this.settings = settings;
    }

    localListener(user: User) {
        user.socket.on("Advance", (index: number) => this.indexes[user.publicInfo.id]=index);
    }

    addMember(user: User) {
        if (this.users.length < this.settings.max_users) {
            this.users.push(user);
            user.socket.join(this.id);
            user.socket.emit("JoinedRoom", this.getPublicInfo());

        } else {
            user.socket.emit("FullRoom");
        }
    }

    getPublicInfo(): PublicRoom {
        return {
            id: this.id,
            users: this.users.map(x => x.publicInfo),
            settings: this.settings,
            active: this.active,
        }
    }

    sendTick(io: CustomServer) {
        console.log(`[Room ${this.id}]: GameTick emmited.`);
        io.to(this.id).emit("GameTick", this.indexes);
    }

    

}
