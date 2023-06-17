import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  login,
  verifyUser,
} from "../controllers/user.controller";
import protect from "../middleware/authMiddleware";

const router = Router();

router
  .get("/", protect, getUser)
  .get("/all", getAllUsers)
  .post("/create", createUser)
  .post("/login", login)
  .put("/verify", verifyUser);

export default router;
