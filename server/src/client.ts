import { io } from "socket.io-client";
import {PublicUser} from "./entities/user";
import { IJoinEvent } from "./events/event_interface";

//let allowed_events = [JoinEvent];

const socket = io("http://localhost:3000", {
    path: "/my-custom-path",
    query: {"name": "noah"},
});

let uuid = "1239123";

let data: IJoinEvent = {user: {uuid, nickname: "leo"}, room_uuid: "123"}

socket.on("connect", () => {
    console.log("Connected to the server.");
    socket.emit("JoinEvent", data);
    socket.on("JoinEvent", (data: PublicUser) => {
        console.log(`${data.nickname} joined your match.`);
    });
});

