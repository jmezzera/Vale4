import * as http from "http";

export default interface WebServer {
    server: http.Server;
    listen(port: number): void;
}
