import express, { Application } from "express";
import * as auth from "../routers/auth";
import { db } from "../db/connection";

class Server {
  private app: Application;
  private port: string;
  private paths = {
    auth: "/budget/auth",
  };

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.port = process.env.PORT || "3000";
    this.dbConnection();
    this.router();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Connection DataBase");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  router() {
    this.app.use(this.paths.auth, auth.router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor Corriendo en el puerto " + this.port);
    });
  }
}

export default Server;
