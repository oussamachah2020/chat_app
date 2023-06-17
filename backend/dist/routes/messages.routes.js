"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messaging_controller_1 = require("../controllers/messaging.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const msgRouter = (0, express_1.Router)();
msgRouter
    .post("/send-message", authMiddleware_1.default, messaging_controller_1.sendMessage)
    .get("/all", messaging_controller_1.getMessagesForConversation);
exports.default = msgRouter;
//# sourceMappingURL=messages.routes.js.map