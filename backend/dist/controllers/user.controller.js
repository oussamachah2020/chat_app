"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.login = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma = new client_1.PrismaClient();
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
        select: { email: true },
    });
    if (newUser) {
        return res.status(201).json({
            message: "User created successfully",
            token: generateToken(newUser.email),
        });
    }
});
exports.createUser = createUser;
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
                access_token: generateToken(user.email),
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
const getUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { token } = req.body;
    const userEmail = (0, jsonwebtoken_1.decode)(token)["email"];
    const userData = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });
    return res.status(200).json(userData);
});
exports.getUser = getUser;
const generateToken = (email) => {
    return (0, jsonwebtoken_1.sign)({ email }, process.env.JWT_PUBLIC_KEY, { expiresIn: "1d" });
};
//# sourceMappingURL=user.controller.js.map