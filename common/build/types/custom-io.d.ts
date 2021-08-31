import { ClientToServerEvents, ServerToClientEvents } from "../events/client_server";
import { Socket, Server as S } from "socket.io";
declare type CustomServer = S<ClientToServerEvents, ServerToClientEvents>;
declare type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type { CustomServer, CustomSocket };
//# sourceMappingURL=custom-io.d.ts.map