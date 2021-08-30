/**
 * Contains all the public user information
 * that will be sent to other clients.
 */
export interface PublicUser {
    uuid: string;
    nickname: string;
}
export interface PublicRoom {
    users: PublicUser[];
    open: boolean;
    active: boolean;
    name: string;
    max_users: number;
}
//# sourceMappingURL=entities.d.ts.map