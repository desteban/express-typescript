import { Request, Response } from "express";

export function indexController(req: Request, res: Response) {
  return res.json("Welcome to API");
}
