import { io } from "socket.io-client";
import { Room } from "./entities/room";
//import {PublicUser} from "./entities/user";
import { ICreateRoomEvent } from "./events/event_interface";

//let allowed_events = [JoinEvent];

const socket = io("http://localhost:8080");

let uuid = "1239123";

let data: ICreateRoomEvent = {user: {uuid, nickname: "leo"}, name: "room 1", max_users: 2};

socket.on("connect", () => {
    console.log("Connected to the server.");
    socket.emit("CreateRoom", data);
    socket.on("CreatedRoom", () => {
        console.log("Created room successfully");
    });

    //socket.emit("JoinRoom", ...);
    socket.on("JoinedRoom", () => console.log("Joined room."));

//    socket.on("NewUserJoinedRoom", (data: PublicUser) => {
//        console.log(data);
//    });

    //socket.emit("GetRooms, ...);
    socket.on("GotRooms", (rooms: Room[]) => console.log(rooms));

    socket.on("ERROR", (data: string) => console.log(data));
});

