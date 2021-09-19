import config from "config";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, createAccessToken } from "../service/userSession.service";
import { sign } from "../utils/jwt.utils";


export async function handleCreateUserSession(req:Request, res:Response) {

    // Validate email and password

    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    // Create a session

    const session = await createSession(user._id, req.get("user-agent") || "")

    // Create access token
    const accessToken = createAccessToken({
      user,
      session,
    });

    // Create refresh token
    const refreshToken = sign(session, {
        expiresIn: config.get("refreshTokenTtl"),
      });

    // Send access and refresh token back
    return res.send({ accessToken, refreshToken });
    
}