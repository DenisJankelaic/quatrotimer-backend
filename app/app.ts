import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";

require("dotenv").config();

import { Routes } from "./routes/routes";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    if (process.env.MONGO_URL != null) {
      mongoose
        .connect(process.env.MONGO_URL, { useNewUrlParser: true })
        .then(() => console.log("Connected to MongoDB."))
        .catch(err => {
          throw err;
        });
    }
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

// tslint:disable-next-line:no-default-export
export default new App().app;
