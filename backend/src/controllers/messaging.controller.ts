import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

/*
  This function gets the messages content and receiver id from the body to create a new message in the database
  each message is related to user which plays the role of the sender
*/
const sendMessage = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { content, receiverId } = req.body;

    const newMessage = await prisma.message.create({
      data: {
        id: uuidv4(),
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
          id: uuidv4(),
          receiverId: receiverId,
          received_at: new Date(),
          messageId: newMessage.id,
        },
      });

      return res.status(201).json({ message: "message sent !" });
    }
  }
);

/*
  this function is called to retrieve all the messages related to a specific receiver
*/
const getMessagesForConversation = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
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
  }
);

export { sendMessage, getMessagesForConversation };
