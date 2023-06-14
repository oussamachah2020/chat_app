"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const expo_server_sdk_1 = __importDefault(require("expo-server-sdk"));
const user_controller_1 = require("./user.controller");
const sendNotification = (req, res) => {
    const { pushToken } = req.body;
    let messages = [];
    if (pushToken) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
        // Check that all your push tokens appear to be valid Expo push tokens
        if (!expo_server_sdk_1.default.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
        }
        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
            to: pushToken,
            sound: "default",
            title: "Account Verification",
            body: `Verification code ${user_controller_1.randomNumber}`,
            data: { withSome: "data" },
        });
    }
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=notifications.controller.js.map