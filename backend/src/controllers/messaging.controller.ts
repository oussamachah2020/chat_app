import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const sendMessage = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { content, sender, receiver } = req.body;

      const newMessage = await prisma.message.create({
        data: {
          id: uuidv4(),
          content,
          sender,
          receiver,
          sent_at: moment().calendar(),
        },
      });

      return res.status(201).json({ newMessage });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

export { sendMessage };
