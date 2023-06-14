"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router
    .post("/create", user_controller_1.createUser)
    .post("/login", user_controller_1.login)
    .get("/getUser", user_controller_1.getUser)
    .put("/verify", user_controller_1.verifyUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map