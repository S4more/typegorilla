/**
 * Contains all the public user information
 * that will be sent to other clients.
 */
export interface PublicUser {
    uuid: string,
    nickname: string,
}

export class User {
    readonly publicInfo: PublicUser;

    constructor(
        uuid: string,
        nickname: string,
    ) {
        this.publicInfo = {uuid, nickname};
    }
}
