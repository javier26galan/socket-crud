import app from "./app";
import { Server as WebsocketServer } from "socket.io";
import http from "http";
import { connectDB } from "./db";
import sockets from "./sockets";
import { PORT } from "./config";

connectDB();
const server = http.createServer(app);//hay que pasarlo a server http con la clase http
const httpServer = server.listen(PORT);//el servidor escucha en este puerto
const io = new WebsocketServer(httpServer);// y le paso el servido a websocket service que va a poder servir el contenido de los sockets, hacer conecxiones
sockets(io);

console.log('server runing on port', PORT);