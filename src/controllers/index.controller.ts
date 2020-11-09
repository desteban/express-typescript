import { Request, Response } from "express";

export function indexController(req: Request, res: Response) {
  return res.json("Welcome to API");
}

export function mensajes(req: Request, res: Response) {
  res.json({
    titulo: "Titulo",
    contenido: "Hola, este es el contenido",
  });
}
