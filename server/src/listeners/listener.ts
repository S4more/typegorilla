import { CustomSocket, RoomSettings } from "../../../common";
import { engine } from "../engine";
import { getUserId, addUser, getHighScore } from "../database/database";

/**
 * Observes all the default events from
 * the sockets registered here.
 */
export function registerDefaultEvents(socket: CustomSocket) {
    socket.onAny((a: any) => console.log(a));
    socket.on("JoinRoom", (data: string) => engine.joinRoom(socket, data));
    socket.on("CreateRoom", (data: RoomSettings) => engine.createRoom(socket, data));
    socket.on("GetRooms", () => engine.getRooms(socket));
    socket.on("RegisterHighscore", (name: string, wpm: number) => {
        
        console.log(name);
        console.log(wpm);

        let new_wpm = wpm;
        getUserId(name).then((id:number) => {
          if( id == -1){
            addUser(name, "password", new_wpm);
          } else{
            getHighScore(name).then((score:number | undefined) => {
              if(!score || score < new_wpm){
                addUser(name, "password", new_wpm);
              }
            })
          }
        })
  
        socket.emit("RegisteredHighscore");

    });
}
