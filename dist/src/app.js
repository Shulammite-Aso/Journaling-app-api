"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("./db/connect"));
const compression_1 = __importDefault(require("compression"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const logger_1 = __importDefault(require("./logger"));
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const app = express_1.default();
app.use(deserializeUser_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(compression_1.default());
app.use('/api/v1/', userRoutes_1.default);
app.get("/healthcheck", (req, res) => res.send("api working fine!"));
app.listen(port, host, () => {
    logger_1.default.info(`Server listing at http://${host}:${port}`);
    connect_1.default();
});
