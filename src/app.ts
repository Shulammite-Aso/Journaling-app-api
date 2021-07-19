import express, { Request, Response } from "express";
import config from "config";
import connect from "./db/connect";
import compression from "compression"
import log from "./logger";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);
  connect();
});