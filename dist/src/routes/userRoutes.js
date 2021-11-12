"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const userSession_controller_1 = require("../controller/userSession.controller");
const user_model_1 = __importDefault(require("../model/user.model"));
const validate_1 = __importDefault(require("../middleware/validate"));
const requireUser_1 = __importDefault(require("../middleware/requireUser"));
const userSchema_1 = require("../schema/userSchema");
const router = express_1.default.Router();
// SIGN UP ENDPOINT
router.post("/signup", validate_1.default(userSchema_1.createUserSchema), user_controller_1.handleUserSignup);
// LOGIN ENDPOINT
router.post("/sessions", validate_1.default(userSchema_1.createUserSessionSchema), userSession_controller_1.handleCreateUserSession);
// LOGOUT ENDPOINT
router.delete("/api/sessions", requireUser_1.default, userSession_controller_1.invalidateUserSessionHandler);
// Currently this route is solely for the purpose of cleaning up after a test
router.post("/test", function (req, res) {
    user_model_1.default.deleteOne({ name: req.body.name }, function (err) {
        if (err)
            console.log(err);
        console.log("Successful deletion");
        return res.sendStatus(200);
    });
});
// DEVELOPMENT BRANCH NEXT
// USER ENDPOINT
/* The Rest of the bellow post paths could go into a different postsRoutes file, then have post operations require user login before they succeed. */
// OPTIONALLY, A DIFF GET ALL JOURNALS ENDPOINT
// GET A PARTICULAR JOURNAL ENDPOINT
// POST JOURNAL ENDPOINT
exports.default = router;
