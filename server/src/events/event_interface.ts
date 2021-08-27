import { PublicUser } from "../entities/user";
import { Room } from "../entities/room";

export interface IJoinEvent {
    user: PublicUser,
    name: string,
}

export interface ICreateRoomEvent {
    user: PublicUser,
    name: string,
    max_users: number,
}

export interface IGotRoomsEvent {
    games: Room[],
}

export interface IClientTick {
    current_index: number;
}

export interface IServerTick {
    players: [{[uuid: number]: number}];
}
