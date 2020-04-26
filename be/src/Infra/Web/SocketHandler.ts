import * as http from "http";
import * as socketIo from "socket.io";

export default class SocketHandler {
    constructor(server: http.Server) {
        const io = socketIo(server);

        io.on("connect", (socket: socketIo.Socket) => {});
    }
}
