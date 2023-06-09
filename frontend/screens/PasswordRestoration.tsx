import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { assets, COLORS, SIZES, FONTS } from "../constants";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREENS } from "../types/screens";

type Props = {};

const PasswordRestoration = (props: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image source={assets.FAQ} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Forget Password?</Text>
      <Text
        style={{
          fontFamily: FONTS.RobotoMedium,
          marginLeft: 30,
          marginTop: 15,
          width: "70%",
          fontSize: 16,
        }}
      >
        Don’t worry! Enter your email to receive a restoration link.
      </Text>
      <View style={styles.form}>
        <Input
          inputMode="email"
          placeholder="E-mail"
          leftIcon={<Icon name="at" size={25} color={"#7C56EC"} />}
          inputStyle={{ paddingLeft: 5 }}
        />
        <Button
          color={COLORS.primary}
          title={"Submit"}
          buttonStyle={{
            borderRadius: 10,
            height: 50,
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PasswordRestoration;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  form: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  title: {
    fontFamily: FONTS.RobotoMedium,
    color: COLORS.primary,
    fontSize: SIZES.extraLarge,
    marginLeft: 30,
    marginTop: 20,
    width: "40%",
  },
  agreement: {
    fontFamily: FONTS.RobotoRegular,
    marginHorizontal: 10,
    lineHeight: SIZES.extraLarge,
    marginBottom: 30,
  },
  specialText: {
    color: COLORS.primary,
    fontFamily: FONTS.RobotoBold,
  },
  passwordRestorationBtn: {
    marginTop: -5,
    marginBottom: 30,
    marginRight: 10,
    alignSelf: "flex-end",
  },
});
