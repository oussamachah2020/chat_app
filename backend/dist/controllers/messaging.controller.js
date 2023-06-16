"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const sendMessage = (0, express_async_handler_1.default)(async (req, res) => {
    const { content } = req.body;
    const newMessage = await prisma.message.create({
        data: {
            id: (0, uuid_1.v4)(),
            content,
            sent_at: new Date(),
            sender: {
                connect: {
                    id: req.user,
                },
            },
        },
    });
    if (newMessage) {
        return res.status(201).json({ message: "message sent !" });
    }
});
exports.sendMessage = sendMessage;
//# sourceMappingURL=messaging.controller.js.map