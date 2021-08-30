import { User } from "./user";
import { PublicUser, PublicRoom } from "../../../common";
import { ICreateRoomEvent } from "../events/event_interface";

export enum Response {
    Full,
    Success
}


export class Room {
    users: User[] = [];
    open: boolean = true;
    active: boolean = true;
    name: string;
    max_users: number;

    constructor(readonly uuid: string, info: ICreateRoomEvent) {
        this.name = info.name;
        this.max_users = info.max_users;
    }

    addMember(user: User) {
        if (this.users.length < this.max_users) {
            this.users.push(user);
            user.socket.join(this.uuid);
            return Response.Success;
        } else {
            return Response.Full;
        }
    }

    getPublicInfo(): PublicRoom {
        return {
            users: this.users.map(x => x.publicInfo),
            open: this.open,
            active: this.active,
            name: this.name,
            max_users: this.max_users
        }
    }
}
