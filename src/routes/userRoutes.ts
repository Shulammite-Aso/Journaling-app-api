import express from "express";
import { handleUser } from "../controller/user.controller";

const router = express.Router();


    // SIGN UP ENDPOINT
    export default router.post('/signup', handleUser);


// LOGIN ENDPOINT

// LOGOUT ENDPOINT

// USER ENDPOINT

// OPTIONALLY, A DIFF GET ALL JOURNALS ENDPOINT

// GET A PARTICULAR JOURNAL ENDPOINT

// POST JOURNAL ENDPOINT