"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.randomNumber = exports.verifyUser = exports.getUser = exports.login = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
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
    const hashedPassword = await (0, bcryptjs_1.hash)(password, 10);
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
            token: generateToken(newUser.id),
        });
    }
});
exports.createUser = createUser;
// this function is used for the user login by checking and verifying his credentials
const login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
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
// this function generate a json web token by taking the user id as a parameter, which will be used in the token payload
const generateToken = (id) => {
    return (0, jsonwebtoken_1.sign)({ id }, process.env.JWT_PUBLIC_KEY, { expiresIn: "1d" });
};
//# sourceMappingURL=user.controller.js.map