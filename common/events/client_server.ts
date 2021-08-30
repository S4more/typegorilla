import { PublicUser, PublicRoom } from "../types/entities";

export interface IJoinRoom {
    user: PublicUser,
    name: string,
}

export interface IJoinedRoom {
}

export interface IGetRoom {
}

export interface IGotRoom {
    rooms: PublicRoom[]
}

export interface ICreateRoomEvent {
    user: PublicUser,
    name: string,
    max_users: number,
}

export interface ICreatedRoomEvent {
}
