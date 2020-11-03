import express, { Application } from "express";
import morgan from "morgan";
import router from "./routes/index.routes";

import IndexRoutes from "./routes/index.routes";

export class app {
  app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    // definir el puerto
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    // datos de formulario
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(IndexRoutes);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log(`http://localhost:${this.app.get("port")}`);
  }
}
