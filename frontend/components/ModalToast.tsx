import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { FONTS, assets } from "../constants";
import { Button } from "react-native-paper";

type Props = {
  visible: boolean;
  title: string;
  text: string;
  link: string;
  setVisible: (value: boolean) => void;
};

const ModalToast = ({ visible, setVisible, title, text, link }: Props) => {
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
          onPress={() => console.log("ok")}
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
