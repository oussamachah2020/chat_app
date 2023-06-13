import { Router } from "express";
import { sendNotification } from "../controllers/notifications.controller";

const notificationRouter = Router();

notificationRouter.post("/", sendNotification);

export default notificationRouter;
