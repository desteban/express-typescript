"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajes = exports.indexController = void 0;
function indexController(req, res) {
    return res.json("Welcome to API");
}
exports.indexController = indexController;
function mensajes(req, res) {
    res.json({
        titulo: "Titulo",
        contenido: "Hola, este es el contenido",
    });
}
exports.mensajes = mensajes;
