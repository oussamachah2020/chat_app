"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    // if (!token) {
    //   return res.status(401).json({ msg: "No token!" });
    // }
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_PUBLIC_KEY);
            req.user = decoded.id;
            next();
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
});
exports.default = protect;
//# sourceMappingURL=authMiddleware.js.map