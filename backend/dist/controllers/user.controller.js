"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const createUser = async (req, res) => {
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
};
exports.createUser = createUser;
const generateToken = async (email) => {
    return (0, jsonwebtoken_1.sign)({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: "1d" });
};
//# sourceMappingURL=user.controller.js.map