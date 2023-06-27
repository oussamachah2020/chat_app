import React, { useState } from "react";
import { Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { Button } from "react-native-paper";

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};

const VerificationModal = ({ visible, setVisible }: Props) => {
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Account has been created successfully!</Text>
        <Text>
          if you didn’t receive any code ,{" "}
          <Button mode="text">click here please!</Button>
        </Text>
      </Overlay>
    </View>
  );
};

export default VerificationModal;
