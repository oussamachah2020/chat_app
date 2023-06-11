import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { userDataType } from "../types/dataTypes";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
  const { fullName, email, password }: userDataType = req.body;

  const hashedPassword: string = await hash(password, 10);

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = await prisma.user.create({
    data: {
      id: uuidv4(),
      fullName,
      email,
      password: hashedPassword,
      verified: false,
    },
    select: { email: true },
  });

  if (newUser) {
    return res.status(201).json({
      message: "User created successfully",
      token: generateToken(newUser.email),
    });
  }
};

const generateToken = async (email: string) => {
  return sign({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1d" });
};

export { createUser };
