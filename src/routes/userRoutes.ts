import express from "express";
import { handleUserSignup } from "../controller/user.controller";
import { handleCreateUserSession, invalidateUserSessionHandler } from "../controller/userSession.controller";
import validate from "../middleware/validate";
import requiresUser from "../middleware/requireUser";
import { createUserSchema, createUserSessionSchema } from "../schema/userSchema";

const router = express.Router();


    // SIGN UP ENDPOINT
     router.post("/signup", validate(createUserSchema), handleUserSignup);

    // LOGIN ENDPOINT
    router.post("/sessions", validate(createUserSessionSchema), handleCreateUserSession);

    // LOGOUT ENDPOINT
    router.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

// USER ENDPOINT

/* The Rest of the bellow post paths could go into a different postsRoutes file, then have post operations require user login before they succeed. */

// OPTIONALLY, A DIFF GET ALL JOURNALS ENDPOINT

// GET A PARTICULAR JOURNAL ENDPOINT

// POST JOURNAL ENDPOINT

export default router;