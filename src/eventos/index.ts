import { Socket } from "socket.io";
import { mensajeGrupo, crearGrupo } from "./Grupo.eventos";
import { crearPersona, agregarPersonas } from "./Persona.eventos";

export const indexEventos = (socket: SocketIO.Socket, io: Socket) => {
  mensajeGrupo(socket, io);
  crearGrupo(socket, io);
  crearPersona(socket, io);
  agregarPersonas(socket, io);
};
