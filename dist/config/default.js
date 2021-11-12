"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    host: process.env.HOST,
    dbUri: process.env.DB_URL,
    privateKey: process.env.PRIVATE_KEY,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL
};
