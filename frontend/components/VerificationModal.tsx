import React, { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { FONTS } from "../constants";
import { Icon, Input, Overlay } from "react-native-elements";
import { useUserStore } from "../store/userStore";
import { verifyUser } from "../api/loaders";

type Props = {
  isVisible: boolean;
};

function VerificationModal({ isVisible }: Props) {
  const VerificationCode = useUserStore((v) => v.verificationCode);
  const email = useUserStore((v) => v.email);
  const setAccessToken = useUserStore((v) => v.setAccessToken);
  const tmpToken = useUserStore((v) => v.tmpToken);
  const [code, setCode] = useState(0);

  const handleVerification = () => {
    console.log(code, VerificationCode);

    if (VerificationCode === code) {
      verifyUser(email).then((result) => {
        setAccessToken(tmpToken);
      });
    }
  };

  return (
    <View>
      <Overlay
        isVisible={isVisible}
        style={{
          backgroundColor:
            "linear-gradient(136deg, rgba(217, 217, 217, 0.40) 0%, rgba(217, 217, 217, 0.10) 100%)",
        }}
        overlayStyle={{
          width: "80%",
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: 5,
          padding: 20,
          elevation: 10,
        }}
      >
        {/* <Image source={assets.Check} resizeMode="contain" /> */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: FONTS.regular,
          }}
        >
          Enter The received code
        </Text>
        <Input
          inputMode="numeric"
          placeholder="Code"
          leftIcon={<Icon name="check" size={25} color={"#7C56EC"} />}
          inputStyle={{ paddingLeft: 5 }}
          containerStyle={{
            marginTop: 20,
          }}
          // defaultValue={code.toString()}
          onChangeText={(text) => setCode(parseInt(text.trim(), 10))}
        />
        <Button
          mode="contained"
          onPress={handleVerification}
          style={{
            marginTop: 10,
            width: "100%",
            // borderRadius: 5,
          }}
          labelStyle={{
            fontSize: 16,
            fontFamily: FONTS.RobotoMedium,
          }}
        >
          Verify{" "}
        </Button>
      </Overlay>
    </View>
  );
}

export default VerificationModal;
