import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let token: string;

    // if (!token) {
    //   return res.status(401).json({ msg: "No token!" });
    // }

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = verify(token, process.env.JWT_PUBLIC_KEY);

        req.user = decoded.id;

        next();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
);

export default protect;
