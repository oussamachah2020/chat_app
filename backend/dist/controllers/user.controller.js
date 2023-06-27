"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.sendPasswordRestorationEmail = exports.uploadImage = exports.getAllUsers = exports.randomNumber = exports.verifyUser = exports.getUser = exports.login = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma = new client_1.PrismaClient();
/*
  Generate random number between 1000 and 9999
  this number will be used as verification code
*/
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const randomNumber = randomIntFromInterval(1000, 9999);
exports.randomNumber = randomNumber;
//this function is used to create a new user and store it in the database
const createUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res
            .status(400)
            .json({ message: "Enter your informations", status_code: 400 });
    }
    const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
    const userExist = await prisma.user.findUnique({
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
            id: (0, uuid_1.v4)(),
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
});
exports.createUser = createUser;
// this function is used for the user login by checking and verifying his credentials
const login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Enter your informations", status_code: 400 });
    }
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (user) {
        const passwordsMatching = await (0, bcryptjs_1.compare)(password, user.password);
        if (passwordsMatching) {
            return res.status(200).json({
                message: `Welcome ${user.fullName}`,
                access_token: generateToken(user.id),
            });
        }
        else {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }
    }
    else {
        return res.status(404).json({
            message: "user with the following credentials does not exist",
        });
    }
});
exports.login = login;
// this function will be called to get the user data by taking a token in the headers
const getUser = (0, express_async_handler_1.default)(async (req, res) => {
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
});
exports.getUser = getUser;
const getAllUsers = (0, express_async_handler_1.default)(async (req, res) => {
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
});
exports.getAllUsers = getAllUsers;
// this function is for verifying the user by checking if the inserted code is matching the generated one.
const verifyUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { verificationCode, email } = req.body;
    if (verificationCode === randomNumber) {
        await prisma.user.update({
            where: {
                email,
            },
            data: { verified: true },
        });
        return res.status(200).json({ message: "Your account is verified !" });
    }
    else {
        return res.status(400).json({ message: "Incorrect code, try again !" });
    }
});
exports.verifyUser = verifyUser;
const uploadImage = (0, express_async_handler_1.default)(async (req, res) => {
    const { imageURL } = req.body;
    if (!imageURL) {
        return res.status(400).json({ message: "Pass a valid image URL" });
    }
    const newImage = await prisma.profile.create({
        data: {
            id: (0, uuid_1.v4)(),
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
});
exports.uploadImage = uploadImage;
const sendPasswordRestorationEmail = (0, express_async_handler_1.default)(async (req, res) => {
    const { email } = req.body;
    const checkEmail = await prisma.user.findUnique({ where: { email } });
    if (!email) {
        return res.status(400).json({ msg: "Please enter your email" });
    }
    if (!checkEmail) {
        return res.status(404).json({ msg: "this email does not exist" });
    }
    else {
        const transporter = nodemailer_1.default.createTransport({
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
            from: `"Chat" <${process.env.EMAIL}>`,
            to: `${email}`,
            subject: "Password Restoration",
            text: "Please click on the following link to change your password:",
            html: emailBody, // html body
        };
        // send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            else {
                return res.status(200).json({
                    msg: `an email has been sent to ${email}\n if you don't see any email messages check in the spam`,
                });
            }
        });
    }
});
exports.sendPasswordRestorationEmail = sendPasswordRestorationEmail;
const updatePassword = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
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
});
exports.updatePassword = updatePassword;
// this function generate a json web token by taking the user id as a parameter, which will be used in the token payload
const generateToken = (id) => {
    return (0, jsonwebtoken_1.sign)({ id }, process.env.JWT_PUBLIC_KEY, { expiresIn: "1d" });
};
//# sourceMappingURL=user.controller.js.map