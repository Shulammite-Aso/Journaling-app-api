import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    host: process.env.HOST,
    dbUri: process.env.DB_URL,
    privateKey: process.env.PRIVATE_KEY,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL
}