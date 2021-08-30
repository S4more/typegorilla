import {Socket} from "socket.io";
import { PublicUser } from "../../../common";

export class User {
    readonly publicInfo: PublicUser;
    constructor(
        uuid: string,
        nickname: string,
        public socket: Socket,
    ) {
        this.publicInfo = {uuid, nickname};
    }

}
