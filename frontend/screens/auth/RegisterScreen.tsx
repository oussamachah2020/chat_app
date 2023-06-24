import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { assets, COLORS, SIZES, FONTS } from "../../constants";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREENS } from "../../types/screens";

type RegisterProps = {
  navigation: any;
};

const RegisterScreen = ({ navigation }: RegisterProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={assets.authImage}
        resizeMode="contain"
        style={{ alignSelf: "center" }}
      />
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.form}>
        <Input
          inputMode="text"
          placeholder="Full Name"
          leftIcon={<Icon name="user" size={25} color={"#7C56EC"} />}
          inputStyle={{ paddingLeft: 5 }}
        />
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
        <Text style={styles.agreement}>
          By signing up, you’re agree to our{" "}
          <Text style={styles.specialText}>Terms & Conditions</Text> and{" "}
          <Text style={styles.specialText}>Privacy Policies</Text>
        </Text>
        <Button
          color={COLORS.primary}
          title={"Create account"}
          buttonStyle={{
            borderRadius: 10,
            height: 50,
          }}
        />
      </View>
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
          Already having an account?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.LOGIN_SCREEN)}
        >
          <Text
            style={{
              fontFamily: FONTS.RobotoBold,
              color: COLORS.primary,
              marginLeft: 5,
              fontSize: SIZES.medium,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

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
});
