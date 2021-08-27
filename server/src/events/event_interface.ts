import { PublicUser } from "../entities/user";
import { Room } from "../entities/room";

export interface IJoinEvent {
    user: PublicUser,
    room_uuid: string,
}

export interface IGetRoomsEvent {
    games: Room[],
}
