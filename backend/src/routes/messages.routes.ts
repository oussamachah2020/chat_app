import { Router } from "express";
import { sendMessage } from "../controllers/messaging.controller";

const msgRouter = Router();

msgRouter.post("/send-message", sendMessage);

export default msgRouter;
