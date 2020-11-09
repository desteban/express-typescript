import { Socket } from "socket.io";
import { Grupo } from "../modelos/Grupos";
import { Personas, PersonaSchema } from "../modelos/Personas";
import { Notificacion } from "./notificar";

const PersonasDB = require("../modelos/Personas");
const Grupodb = require("../modelos/Grupos");

export const crearPersona = (socket: SocketIO.Socket, io: Socket) => {
  socket.on("persona:nueva", (persona: Personas) => {
    const personaguardar = new PersonasDB(persona);
    guardarPersona(personaguardar)
      .then((personadb) => {
        Notificacion(
          socket,
          { code: 201, mensaje: "La persona se agrego exitosamente" },
          persona.id_persona
        );
      })
      .catch((err: any) => {
        Notificacion(
          socket,
          { code: 204, mensaje: "No su puede guardar esta persona" },
          persona.id_persona
        );
      });
  });
};

export const agregarPersonas = async (socket: SocketIO.Socket, io: Socket) => {
  socket.on("grupo:agregar", async (data) => {
    const { grupoId, persona, codigoPersona } = data;

    //buscar persona
    let personaDB = await obtenerPersona(persona);

    if (personaDB) {
      //agregar persona al grupo
      let grupoDB = await obtenerGrupo(grupoId);

      if (grupoDB) {
        grupoDB.personas.push(personaDB);
        grupoDB.save();

        Notificacion(
          socket,
          { code: 201, mensaje: `Persona agregada al grupo ${grupoDB.nombre}` },
          codigoPersona
        );
      }

      if (!grupoDB) {
        Notificacion(
          socket,
          { code: 404, mensaje: "Grupo no encontrado" },
          codigoPersona
        );
      }
    }

    if (!personaDB) {
      Notificacion(
        socket,
        { code: 404, mensaje: "No encontramos la persona" },
        codigoPersona
      );
    }
  });
};

const guardarPersona = async (persona: any) => {
  const personadb = await persona.save();
  return personadb;
};

const obtenerGrupo = async (grupoId: any) => {
  let grupo = await Grupodb.findById(grupoId);
  return grupo;
};

const obtenerPersona = async (persona: object) => {
  const personadb = await PersonasDB.findOne(persona);
  return personadb;
};
