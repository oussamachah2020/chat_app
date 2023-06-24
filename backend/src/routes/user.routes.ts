import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  login,
  sendPasswordRestorationEmail,
  updatePassword,
  uploadImage,
  verifyUser,
} from "../controllers/user.controller";
import protect from "../middleware/authMiddleware";

const router = Router();

router
  .get("/", protect, getUser)
  .get("/all", getAllUsers)
  .post("/create", createUser)
  .post("/login", login)
  .put("/verify", verifyUser)
  .post("/upload", protect, uploadImage)
  .post("/send-restoration-email", sendPasswordRestorationEmail)
  .put("/update-password", updatePassword);

export default router;
