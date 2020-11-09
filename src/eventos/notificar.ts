export interface INotificacion {
  code: number;
  mensaje: string;
  data?: any;
}

export const Notificacion = (
  socket: SocketIO.Socket,
  notificacion: INotificacion,
  codigopersona: any
) => {
  socket.emit(`${codigopersona}:notificacion`, notificacion);
};
