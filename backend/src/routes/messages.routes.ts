import { Router } from "express";
import {
  getMessagesForConversation,
  sendMessage,
} from "../controllers/messaging.controller";
import protect from "../middleware/authMiddleware";

const msgRouter = Router();

msgRouter
  .post("/send-message", protect, sendMessage)
  .get("/all", getMessagesForConversation);

export default msgRouter;
