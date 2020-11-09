import { Socket } from "socket.io";
import { Mensajes } from "../modelos/Mensajes";
import { Personas } from "../modelos/Personas";
import { Grupo } from "../modelos/Grupos";
import { Notificacion } from "./notificar";

const Grupodb = require("../modelos/Grupos");
const MensajeDB = require("../modelos/Mensajes");
const PersonaDB = require("../modelos/Personas");

interface IMensaje {
  contenido: Mensajes;
  grupoId: string;
  usuario: Personas;
  send?: boolean;
}

interface Response {
  code: number;
  mensaje?: string;
  data?: any;
}

/*export const mensajeGrupo = async (socket: SocketIO.Socket, io: Socket) => {
  socket.on("grupo:mensaje", async (data: IMensaje) => {
    io.emit(`${data.grupo}:mensajes`, data);

    let mensaje = new MensajeDB(data.contenido);

    Grupodb.findById("5f870ebbf014b501e6f1c45c").exec(
      (err: any, grupo: any) => {
        console.log(mensaje);
        if (grupo) {
          //grupo.mensajes.push()
        }
      }
    );
  });
};*/

export const mensajeGrupo = async (socket: SocketIO.Socket, io: Socket) => {
  socket.on("grupo:mensaje", async (data: IMensaje) => {
    //buscar persona
    let persona = await obtenerPersona(data.usuario);

    if (persona) {
      //crear mensaje
      let mensaje = new MensajeDB({
        texto: data.contenido.texto,
        usuario: persona,
      });

      //guardar mensaje
      let grupo = await obtenerGrupo(data.grupoId);

      if (grupo) {
        grupo.mensajes.push(mensaje);
        grupo.save();

        console.log(grupo._id);
        io.emit(`${grupo._id}:mensajes`, mensaje);
      }

      if (!grupo) {
        Notificacion(
          socket,
          { code: 404, mensaje: "No encontramos el grupo" },
          data.usuario.codigo
        );
      }

      //enviar mensaje
    }

    if (!persona) {
      Notificacion(
        socket,
        { code: 404, mensaje: "No podemos validar tu identidad" },
        data.usuario.codigo
      );
    }
  });
};

export const crearGrupo = (socket: SocketIO.Socket, io: Socket) => {
  socket.on("nuevo:grupo", (data: Grupo) => {
    const grupo = new Grupodb(data);
    guardarGrupo(grupo)
      .then((grupoCreado) => {
        //notificar que se creo el grupo
        const response: Response = {
          code: 201,
          mensaje: "Grupo creado",
        };
        socket.emit(`${data.persona}:grupo-nuevo`, response);

        //obtener listado de grupos
        getGrupos().then((lista) => {
          response.data = lista;
          response.code = 200;
          //notificar
          socket.emit(`${data.persona}:grupos-lista`, response);
        });
      })
      .catch((err) => {
        //notificar que no se ha podido crear el grupo
        console.log("no se ha creado el grupo");
      });
  });
};

export const obtenerGrupos = (socket: SocketIO.Socket, io: Socket) => {
  socket.on("grupo:lista", () => {
    //obtener listado de grupos
    getGrupos()
      .then((listaGrupos) => {
        console.log(listaGrupos);
      })
      .catch((err) => {
        console.log("Error al obtener la lista de los grupos");
      });
  });
};

const guardarGrupo = async (grupo: any) => {
  const grupoCreado = await grupo.save();
  return grupoCreado;
};

const getGrupos = async () => {
  const lista = await Grupodb.find();
  return lista;
};

const obtenerPersona = async (persona: object) => {
  const personadb = await PersonaDB.findOne(persona);
  return personadb;
};

const obtenerGrupo = async (grupoId: any) => {
  let grupo = await Grupodb.findById(grupoId);
  return grupo;
};
