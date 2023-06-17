"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesForConversation = exports.sendMessage = void 0;
const client_1 = require("@prisma/client");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
/*
  This function gets the messages content and receiver id from the body to create a new message in the database
  each message is related to user which plays the role of the sender
*/
const sendMessage = (0, express_async_handler_1.default)(async (req, res) => {
    const { content, receiverId } = req.body;
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
        select: { id: true },
    });
    if (newMessage) {
        await prisma.receiver.create({
            data: {
                id: (0, uuid_1.v4)(),
                receiverId: receiverId,
                received_at: new Date(),
                messageId: newMessage.id,
            },
        });
        return res.status(201).json({ message: "message sent !" });
    }
});
exports.sendMessage = sendMessage;
/*
  this function is called to retrieve all the messages related to a specific receiver
*/
const getMessagesForConversation = (0, express_async_handler_1.default)(async (req, res) => {
    const { receiverId } = req.body;
    const receiver = await prisma.receiver.findMany({
        where: {
            receiverId: receiverId,
        },
        select: { messageId: true },
    });
    if (receiver) {
        const messages = await prisma.message.findMany({
            where: {
                id: receiver.messageId,
            },
        });
        if (messages.length > 0) {
            return res.status(200).json(messages);
        }
    }
});
exports.getMessagesForConversation = getMessagesForConversation;
//# sourceMappingURL=messaging.controller.js.map