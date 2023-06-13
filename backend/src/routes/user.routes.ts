import { Router } from "express";
import { createUser, getUser, login } from "../controllers/user.controller";

const router = Router();

router
  .post("/create", createUser)
  .post("/login", login)
  .get("/getUser", getUser);

export default router;
