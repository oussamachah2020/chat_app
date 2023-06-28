import React, { useEffect, useMemo, useState } from "react";
import { Image, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { FONTS, assets } from "../constants";
import { Button } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { sendPushNotification } from "../App";
import { useUserStore } from "../store/userStore";

type Props = {
  visible: boolean;
  title: string;
  text: string;
  link: string;
  setVisible: (value: boolean) => void;
  setIsVisible: (value: boolean) => void;
};

const ModalToast = ({
  visible,
  setVisible,
  title,
  text,
  link,
  setIsVisible,
}: Props) => {
  const expoPushToken = useUserStore((v) => v.expoPushToken);
  function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const randomNumber = randomIntFromInterval(1000, 9999);
  const setVerificationCode = useUserStore((v) => v.setVerificationCode);

  const verification = useMemo(() => {
    setVerificationCode(randomNumber);
  }, [randomNumber]);

  const handleNotification = () => {
    sendPushNotification(expoPushToken);
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Verification code",
        body: `Your verification code is ${verification}`,
      },
      trigger: null,
    });
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        style={{
          backgroundColor:
            " linear-gradient(136deg, rgba(217, 217, 217, 0.40) 0%, rgba(217, 217, 217, 0.10) 100%)",
        }}
        overlayStyle={{
          width: "80%",
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: 5,
          padding: 20,
        }}
      >
        <Image source={assets.Check} resizeMode="contain" />
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontFamily: FONTS.medium,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // marginHorizontal: 50,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.RobotoRegular,
              fontSize: 12,
            }}
          >
            {text}
          </Text>
          <Button
            mode="text"
            style={{
              marginTop: -5,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.RobotoRegular,
                fontSize: 12,
              }}
            >
              {link}
            </Text>
          </Button>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            setVisible(false);
            setIsVisible(true);
            handleNotification();
          }}
          style={{
            marginTop: 10,
          }}
        >
          Go to verify
        </Button>
      </Overlay>
    </View>
  );
};

export default ModalToast;
