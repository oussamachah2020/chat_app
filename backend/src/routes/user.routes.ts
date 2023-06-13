import { Router } from "express";
import {
  createUser,
  getUser,
  login,
  verifyUser,
} from "../controllers/user.controller";

const router = Router();

router
  .post("/create", createUser)
  .post("/login", login)
  .get("/getUser", getUser)
  .put("/verify", verifyUser);

export default router;
