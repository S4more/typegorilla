import { PublicUser, CustomSocket } from "../../../common";

export class User {
    readonly publicInfo: PublicUser;
    constructor(
        id: string,
        nickname: string,
        public socket: CustomSocket,
    ) {
        this.publicInfo = {id, nickname};
    }

}
