import { PublicUser, PublicRoom, RoomSettings } from "../types/entities";

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

export interface ClientToServerEvents {
    GetRooms: () => void;
    JoinRoom: (name: string) => void;
    CreateRoom: (settings: RoomSettings) => void;
    Advance: (index: number) => void;

    RegisterHighscore: (name: string, wpm: number) => void;
}

export interface ServerToClientEvents {
    GotRooms: (rooms: PublicRoom[]) => void;
    JoinedRoom: (room: PublicRoom) => void;
    CreatedRoom: (name: PublicRoom) => void;

    GameTick: (indexes: {[user_id: string]: number}) => void;

    FullRoom: () => void;
    NotFoundRoom: () => void;
    RegisteredHighscore: () => void;
}
