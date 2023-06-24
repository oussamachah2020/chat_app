"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router
    .get("/", authMiddleware_1.default, user_controller_1.getUser)
    .get("/all", user_controller_1.getAllUsers)
    .post("/create", user_controller_1.createUser)
    .post("/login", user_controller_1.login)
    .put("/verify", user_controller_1.verifyUser)
    .post("/upload", authMiddleware_1.default, user_controller_1.uploadImage)
    .post("/send-restoration-email", user_controller_1.sendPasswordRestorationEmail)
    .put("/update-password", user_controller_1.updatePassword);
exports.default = router;
//# sourceMappingURL=user.routes.js.map