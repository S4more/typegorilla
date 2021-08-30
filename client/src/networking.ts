import { io } from "socket.io-client";

import { PublicRoom } from "../../common";

class Networking {
    readonly socket = io("http://localhost:8080");

    constructor() {
        this.socket.on("connect", () => {
            console.log("socket connected.");
        });
    }

    async getGames() : Promise<PublicRoom[]> {
        this.socket.emit("GetRooms");
        return await new Promise (resolve => {
            this.socket.once("GotRooms", (gameList: PublicRoom[]) => resolve(gameList));
        });
    }
}

export default new Networking;
