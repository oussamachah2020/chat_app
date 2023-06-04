import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { Button } from "@rneui/themed";
import { SCREENS } from "../types/screens";

type Props = {};

function Description({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image source={assets.phone} alt="phone" resizeMode="contain" />
      <Text style={styles.description}>
        Welcome to the chat app Here you can make friends, talk to them and also
        create some room in case of a group talks. Feel free to express
        yourself.
      </Text>
      <Button
        title={"Continue"}
        buttonStyle={styles.continueBtn}
        color={COLORS.primary}
        onPress={() => navigation.navigate(SCREENS.REGISTER_SCREEN)}
      />
    </View>
  );
}

export default Description;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    position: "relative",
    top: -20,
  },

  continueBtn: {
    marginTop: 50,
    borderRadius: 10,
    width: 350,
    height: 45,
  },

  description: {
    textAlign: "center",
    marginHorizontal: 40,

    marginTop: 5,
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
  },
});
