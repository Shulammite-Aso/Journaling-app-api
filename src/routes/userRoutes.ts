import express from "express";
import { handleUserSignup } from "../controller/user.controller";
import { handleCreateUserSession, invalidateUserSessionHandler } from "../controller/userSession.controller";
import { createPostHandler, updatePostHandler, getPostHandler, deletePostHandler } from "../controller/post.controller";
import User from "../model/user.model"
import validate from "../middleware/validate";
import requiresUser from "../middleware/requireUser";
import { createUserSchema, createUserSessionSchema } from "../schema/user.schema";
import { createPostSchema, updatePostSchema, deletePostSchema} from "../schema/post.schema";


const router = express.Router();


    // SIGN UP ENDPOINT
     router.post("/signup", validate(createUserSchema), handleUserSignup);

    // LOGIN ENDPOINT
    router.post("/sessions", validate(createUserSessionSchema), handleCreateUserSession);

    // LOGOUT ENDPOINT
    router.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // CREATE A POST
  router.post(
    "/api/posts",
    [requiresUser, validate(createPostSchema)],
    createPostHandler
  );

    // UPDATE A POST
    router.put(
    "/api/posts/:postId",
    [requiresUser, validate(updatePostSchema)],
    updatePostHandler
  );

  // GET A POST
  router.get("/api/posts/:postId", getPostHandler);

  // DELETE A POST
  router.delete(
    "/api/posts/:postId",
    [requiresUser, validate(deletePostSchema)],
    deletePostHandler
  );

    // Currently this route is solely for the purpose of cleaning up after a test
    router.post("/test", function(req, res) {
         User.deleteOne({ name: req.body.name }, function (err: any) {
            if(err) console.log(err);
            console.log("Successful deletion");
            return res.sendStatus(200);
          });
    });


export default router;