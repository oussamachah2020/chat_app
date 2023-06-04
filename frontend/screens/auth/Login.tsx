import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { assets, COLORS, SIZES, FONTS } from "../../constants";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREENS } from "../../types/screens";

type Props = {};

const Login = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image source={assets.authImage} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Sign in</Text>
      <View style={styles.form}>
        <Input
          inputMode="email"
          placeholder="E-mail"
          leftIcon={<Icon name="at" size={25} color={"#7C56EC"} />}
          inputStyle={{ paddingLeft: 5 }}
        />
        <Input
          inputMode="text"
          secureTextEntry={true}
          placeholder="Password"
          inputStyle={{ paddingLeft: 5 }}
          leftIcon={<Icon name="lock" size={25} color={"#7C56EC"} />}
        />
        <TouchableOpacity
          style={styles.passwordRestorationBtn}
          onPress={() => navigation.navigate(SCREENS.RESTORATION_SCREEN)}
        >
          <Text
            style={{
              fontFamily: FONTS.RobotoMedium,
              color: COLORS.primary,
              fontSize: SIZES.medium,
            }}
          >
            Forget Password?
          </Text>
        </TouchableOpacity>
        <Button
          color={COLORS.primary}
          title={"Login"}
          buttonStyle={{
            borderRadius: 10,
            height: 50,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 25,
          marginTop: 20,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <View>
          <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <Button
        title={"Login With Google"}
        buttonStyle={{
          marginHorizontal: 25,
          borderRadius: 10,
          marginTop: 20,
          height: 50,
        }}
        titleStyle={{
          color: "black",
        }}
        color={"#F4F3F3"}
        icon={
          <Image
            source={assets.google}
            resizeMode="cover"
            style={{ width: 30, height: 30, position: "relative", right: 60 }}
          />
        }
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.RobotoMedium,
            textAlign: "center",
            fontSize: SIZES.medium,
          }}
        >
          New User?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.REGISTER_SCREEN)}
        >
          <Text
            style={{
              fontFamily: FONTS.RobotoBold,
              color: COLORS.primary,
              marginLeft: 5,
              fontSize: SIZES.medium,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
