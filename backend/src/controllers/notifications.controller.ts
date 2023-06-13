import Expo from "expo-server-sdk";
import { Request, Response } from "express";
import { randomNumber } from "./user.controller";

const sendNotification = (req: Request, res: Response) => {
  const { pushToken } = req.body;

  let messages = [];
  if (pushToken) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      sound: "default",
      title: "Account Verification",
      body: `Verification code ${randomNumber}`,
      data: { withSome: "data" },
    });
  }
};

export { sendNotification };
