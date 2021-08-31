import { ClientToServerEvents, ServerToClientEvents } from "../events/client_server";
import { Socket, Server as S, Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
type CustomServer = S<ClientToServerEvents, ServerToClientEvents>;
type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

export type { CustomServer, CustomSocket };
