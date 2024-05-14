import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute ,getMessages); 
router.post("/send/:id", protectRoute ,sendMessage); //protectRoute is a Authorization process middleware that we are adding in between them. 

export default router;