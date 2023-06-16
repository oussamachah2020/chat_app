import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const sendMessage = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { content } = req.body;

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
    });

    if (newMessage) {
      return res.status(201).json({ message: "message sent !" });
    }
  }
);

export { sendMessage };
