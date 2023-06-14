"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messaging_controller_1 = require("../controllers/messaging.controller");
const msgRouter = (0, express_1.Router)();
msgRouter.post("/send-message", messaging_controller_1.sendMessage);
exports.default = msgRouter;
//# sourceMappingURL=messages.routes.js.map