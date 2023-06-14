"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifications_controller_1 = require("../controllers/notifications.controller");
const notificationRouter = (0, express_1.Router)();
notificationRouter.post("/", notifications_controller_1.sendNotification);
exports.default = notificationRouter;
//# sourceMappingURL=notification.routes.js.map