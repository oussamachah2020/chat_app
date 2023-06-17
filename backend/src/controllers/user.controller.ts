import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ILogin, IUser, userDataType } from "../types/dataTypes";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcryptjs";
import { decode, sign } from "jsonwebtoken";
import AsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

/* 
  Generate random number between 1000 and 9999
  this number will be used as verification code
*/
function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNumber = randomIntFromInterval(1000, 9999);

//this function is used to create a new user and store it in the database
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
      select: { id: true },
    });

    if (newUser) {
      return res.status(201).json({
        message: "User created successfully",
        token: generateToken(newUser.id),
      });
    }
  }
);

// this function is used for the user login by checking and verifying his credentials
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
          access_token: generateToken(user.id),
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

// this function will be called to get the user data by taking a token in the headers
const getUser = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const userData = await prisma.user.findUnique({
      where: {
        id: req.user,
      },
      select: {
        fullName: true,
        email: true,
      },
    });
    return res.status(200).json(userData);
  }
);

const getAllUsers = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    if (users.length > 0) {
      return res.status(200).json(users);
    }

    return res.status(404).json({ message: "No user was found" });
  }
);

// this function is for verifying the user by checking if the inserted code is matching the generated one.
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

// this function generate a json web token by taking the user id as a parameter, which will be used in the token payload
const generateToken = (id: string) => {
  return sign({ id }, process.env.JWT_PUBLIC_KEY, { expiresIn: "1d" });
};

export { createUser, login, getUser, verifyUser, randomNumber, getAllUsers };
