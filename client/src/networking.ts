import { io } from "socket.io-client";
const socket = io("ws://localhost:3000");
import IGame from "./types/game"
export default {
	socket: io("ws://localhost:3000"),
	connected:false,

	getGames (): Promise<IGame[]> {
		return new Promise((res, rej) => {
			socket.send("req", "games");
			socket.on("games", (gameList: IGame[]) => {
				res(gameList);
			})
		})
	}
}