import express, { Request, Response } from "express";
import config from "config";
import connect from "./db/connect";
import compression from "compression"
import userRoutes from "./routes/userRoutes"
import deserializeUser from "./middleware/deserializeUser";
import log from "./logger";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use('/api/v1/', userRoutes);

app.get("/healthcheck", (req: Request, res: Response) => res.send("api working fine!"));

app.listen(port, () => {
  log.info(`Server listing at: http://${host}:${port}`);
  connect();
});