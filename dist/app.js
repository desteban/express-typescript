"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import morgan from "morgan";
const index_routes_1 = __importDefault(require("./routes/index.routes"));
class app {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        // definir el puerto
        this.app.set("port", this.port || process.env.PORT || 3000);
    }
    middlewares() {
        // this.app.use(morgan("dev"));
        this.app.use(express_1.default.json());
        // datos de formulario
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(index_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get("port"));
            console.log(`http://localhost:${this.app.get("port")}`);
        });
    }
}
exports.app = app;
