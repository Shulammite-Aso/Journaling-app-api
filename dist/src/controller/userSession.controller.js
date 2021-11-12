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
exports.invalidateUserSessionHandler = exports.handleCreateUserSession = void 0;
const config_1 = __importDefault(require("config"));
const lodash_1 = require("lodash");
const user_service_1 = require("../service/user.service");
const userSession_service_1 = require("../service/userSession.service");
const jwt_utils_1 = require("../utils/jwt.utils");
function handleCreateUserSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate email and password
        const user = yield user_service_1.validatePassword(req.body);
        if (!user) {
            return res.status(401).send("Invalid username or password");
        }
        // Create a session
        const session = yield userSession_service_1.createSession(user._id, req.get("user-agent") || "");
        // Create access token
        const accessToken = userSession_service_1.createAccessToken({
            user,
            session,
        });
        // Create refresh token
        const refreshToken = jwt_utils_1.sign(session, {
            expiresIn: config_1.default.get("refreshTokenTtl"),
        });
        // Send access and refresh token back
        return res.send({ accessToken, refreshToken });
    });
}
exports.handleCreateUserSession = handleCreateUserSession;
function invalidateUserSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionId = lodash_1.get(req, "user.session");
        yield userSession_service_1.updateSession({ _id: sessionId }, { valid: false });
        return res.sendStatus(200);
    });
}
exports.invalidateUserSessionHandler = invalidateUserSessionHandler;
