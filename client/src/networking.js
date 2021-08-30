import { io } from "socket.io-client";
//import IGame from "./types/game"
var socket = io("http://localhost:8080");
socket.on("connect", function () {
    console.log("socket connected.");
});
export { socket };
//# sourceMappingURL=networking.js.map