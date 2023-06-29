import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ILogin, IUser, userDataType } from "../types/dataTypes";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcryptjs";
import { decode, sign } from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

/* 
  Generate random number between 1000 and 9999
  this number will be used as verification code
*/

//this function is used to create a new user and store it in the database
const createUser = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { fullName, email, password }: userDataType = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Enter your informations", status_code: 400 });
    }

    const hashedPassword: string = await hash(password, 10);

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      return res
        .status(409)
        .json({ message: "User already exists", status_code: 409 });
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
        access_token: generateToken(newUser.id),
        status_code: 201,
      });
    }
  }
);

// this function is used for the user login by checking and verifying his credentials
const login = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password }: ILogin = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Enter your informations", status_code: 400 });
    }
    const user = await prisma.user.findFirst({
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
    const userData = await prisma.user.findFirst({
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
    try {
      const userId = req.user; // Assuming req.user contains the user's ID

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          verified: true,
        },
      });

      if (updatedUser) {
        return res.status(200).json({ message: "Your account is verified!" });
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
      return res.status(500).json({ message: "Failed to update user." });
    }
  }
);

const uploadImage = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { imageURL } = req.body;

    if (!imageURL) {
      return res.status(400).json({ message: "Pass a valid image URL" });
    }

    const newImage = await prisma.profile.create({
      data: {
        id: uuidv4(),
        imageURL: imageURL,
        author: {
          connect: {
            id: req.user, // Assuming req.user is an object that contains the user's ID
          },
        },
      },
    });

    if (newImage) {
      return res.status(201).json({ message: "Image successfully uploaded" });
    }
  }
);

const sendPasswordRestorationEmail = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body;

    const checkEmail = await prisma.user.findFirst({ where: { email } });

    if (!email) {
      return res.status(400).json({ msg: "Please enter your email" });
    }

    if (!checkEmail) {
      return res.status(404).json({ msg: "this email does not exist" });
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const emailBody = `<!DOCTYPE html>
      <html>
      <head>
          <title>Your Beautiful Email</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f7f7f7;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 4px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
      
              h1 {
                  color: #333333;
                  text-align: center;
              }
      
              p {
                  color: #555555;
                  line-height: 1.5;
                  margin-bottom: 20px;
              }
      
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #4CAF50;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 4px;
              }
      
              .button:hover {
                  background-color: #45a049;
              }
      
              .footer {
                  text-align: center;
                  margin-top: 30px;
                  color: #999999;
                  font-size: 12px;
              }
          </style>
      </head>
      <body>
          <div class="container">
          <h2>Hello dear user</h2>
          <p>Please click on the following button to update your password.</p>
          <p>you will be directed to a page with a form where you can insert the new password</p>
          <a href='http://localhost:5173/password-restore?email=${email}'>
            <button>Update Password</button>
          </a>
          </div>
      
          <div class="footer">
              &copy; 2023 Your Company. All rights reserved.
          </div>
      </body>
      </html>
      `;

      // setup email data
      const mailOptions = {
        from: `"Chat" <${process.env.EMAIL}>`, // sender address
        to: `${email}`, // list of receivers
        subject: "Password Restoration", // Subject line
        text: "Please click on the following link to change your password:", // plain text body
        html: emailBody, // html body
      };

      // send email
      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          return console.log(error);
        } else {
          return res.status(200).json({
            msg: `an email has been sent to ${email}\n if you don't see any email messages check in the spam`,
          });
        }
      });
    }
  }
);

const updatePassword = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const hashedPassword: string = await hash(password, 10);

    const checkUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (checkUser) {
      return res.status(200).json({ msg: "password changed!" });
    }
    return res.status(400).json({ msg: "something went wrong" });
  }
);

// this function generate a json web token by taking the user id as a parameter, which will be used in the token payload
const generateToken = (id: string) => {
  return sign({ id }, process.env.JWT_PUBLIC_KEY, { expiresIn: "1d" });
};

export {
  createUser,
  login,
  getUser,
  verifyUser,
  getAllUsers,
  uploadImage,
  sendPasswordRestorationEmail,
  updatePassword,
};
