import { User } from "./user";
import { PublicRoom, RoomSettings } from "../../../common";

export enum Response {
    Full,
    Success
}


export class Room {
    users: User[] = [];
    settings: RoomSettings;
    active: boolean = false;

    constructor(readonly id: string, settings: RoomSettings) {
        this.settings = settings;
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
}
