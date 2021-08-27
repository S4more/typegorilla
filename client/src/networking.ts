import { io } from "socket.io-client";
const socket = io("ws://localhost:8080");
import ILobby from "./types/lobby"
export default {
	socket: io("ws://localhost:8080"),
	connected:false,
	getGames (): Promise<ILobby[]> {
		return new Promise( (res, rej) => {
			socket.send("message", "games");
			socket.on("games", (gameList: ILobby[]) => {
				res(gameList);
			})
		})
	}
}