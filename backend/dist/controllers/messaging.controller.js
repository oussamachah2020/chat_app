"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
const sendMessage = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const { content, sender, receiver } = req.body;
        const newMessage = await prisma.message.create({
            data: {
                id: (0, uuid_1.v4)(),
                content,
                sender,
                receiver,
                sent_at: (0, moment_1.default)().calendar(),
            },
        });
        return res.status(201).json({ newMessage });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.sendMessage = sendMessage;
//# sourceMappingURL=messaging.controller.js.map