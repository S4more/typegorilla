/**
 * Contains all the public user information
 * that will be sent to other clients.
 */
export interface PublicUser {
    id: string,
    nickname: string,
}

export interface PublicRoom {
    id: string,
    users: PublicUser[],
    open: boolean,
    active: boolean,
    name: string,
    max_users: number;
}