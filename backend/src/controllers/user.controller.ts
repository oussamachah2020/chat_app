import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ILogin, IUser, userDataType } from "../types/dataTypes";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcryptjs";
import { decode, sign } from "jsonwebtoken";
import AsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNumber = randomIntFromInterval(1000, 9999);

const createUser = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
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
  }
);

const login = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password }: ILogin = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const passwordsMatching = await compare(password, user.password);

      if (passwordsMatching) {
        return res.status(200).json({
          message: `Welcome ${user.fullName}`,
          access_token: generateToken(user.email),
        });
      } else {
        return res.status(400).json({
          message: "Incorrect password",
        });
      }
    } else {
      return res.status(404).json({
        message: "user with the following credentials does not exist",
      });
    }
  }
);

const getUser = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { token } = req.body;

    const userEmail = decode(token)["email"];

    const userData = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    return res.status(200).json(userData);
  }
);

const verifyUser = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { verificationCode, email } = req.body;

    if (verificationCode === randomNumber) {
      await prisma.user.update({
        where: {
          email,
        },
        data: { verified: true },
      });

      return res.status(200).json({ message: "Your account is verified !" });
    } else {
      return res.status(400).json({ message: "Incorrect code, try again !" });
    }
  }
);

const generateToken = (email: string) => {
  return sign({ email }, process.env.JWT_PUBLIC_KEY, { expiresIn: "1d" });
};

export { createUser, login, getUser, verifyUser, randomNumber };
