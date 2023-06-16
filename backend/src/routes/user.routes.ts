import { Router } from "express";
import {
  createUser,
  getUser,
  login,
  verifyUser,
} from "../controllers/user.controller";
import protect from "../middleware/authMiddleware";

const router = Router();

router
  .post("/create", createUser)
  .post("/login", login)
  .get("/", protect, getUser)
  .put("/verify", verifyUser);

export default router;
