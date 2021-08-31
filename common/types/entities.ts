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
    active: boolean,
    settings: RoomSettings,
}

export interface RoomSettings {
    name: string,
    word_count: number,
    time_limit: number,
    open: boolean,
    max_users: number;
}
