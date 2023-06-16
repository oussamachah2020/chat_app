import { Router } from "express";
import { sendMessage } from "../controllers/messaging.controller";
import protect from "../middleware/authMiddleware";

const msgRouter = Router();

msgRouter.post("/send-message", protect, sendMessage);

export default msgRouter;
