import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", signUp);

router.post("/login", login);

router.post("/logout", logout);

export default router;



/*
    Ok so if i create all routes here for login, logout, signup,etc then code become length,
    so to overcome this issue we create controllers and use it.
*/