import 'reflect-metadata';
import express from "express";
import cors from "cors";
import routes from "./routes";
import LoggerMiddleware from "./middlewares/logger";
import "./database";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(LoggerMiddleware);
  }

  private routes(): void {
    this.express.use("/api", routes);
  }
}

export default new App().express;
