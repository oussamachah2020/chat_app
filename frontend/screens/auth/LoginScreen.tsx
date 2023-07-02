import React, { FormEvent, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { assets, COLORS, SIZES, FONTS } from "../../constants";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREENS } from "../../types/screens";
import { useForm, SubmitHandler } from "react-hook-form";
import { userLogin } from "../../api/loaders";
import { useUserStore } from "../../store/userStore";
import Loader from "../../components/Loader";
import { Button } from "@rneui/base";
import { signIn } from "../../firebase";
import Toast from "../../components/Toast";
import { toastStore } from "../../store/toastStore";

type Props = {
  navigation: any;
};

interface IUser {
  email: string;
  password: string;
}

const LoginScreen = ({ navigation }: Props) => {
  const [formData, setFormData] = useState<IUser>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const setToken = useUserStore((v) => v.setAccessToken);
  const isVisible = toastStore((v) => v.isVisible);

  const handleUserLogin = () => {
    setIsLoading(true);
    userLogin(formData.email, formData.password).then((response) => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

      console.log("token => ", response.access_token);
      setToken(response.access_token);
    });
  };

  useEffect(() => {
    if (formData.email === "" || formData.password === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [disabled, formData]);

  return (
    <View style={styles.container}>
      {isVisible && <Toast />}
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
          value={formData.email}
          onChangeText={(text) =>
            setFormData((prevData) => ({
              ...prevData,
              email: text,
            }))
          }
        />
        <Input
          inputMode="text"
          secureTextEntry={true}
          placeholder="Password"
          inputStyle={{ paddingLeft: 5 }}
          leftIcon={<Icon name="lock" size={25} color={"#7C56EC"} />}
          value={formData.password}
          onChangeText={(text) =>
            setFormData((prevData) => ({
              ...prevData,
              password: text,
            }))
          }
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
        {/* <Button
          color={COLORS.primary}
          title={"Login"}
          buttonStyle={{
            borderRadius: 10,
            height: 50,
          }}
          onPress={handleUserLogin}
        /> */}
        <TouchableOpacity
          style={{
            borderRadius: 10,
            height: 50,
            justifyContent: "center",
            backgroundColor: disabled ? "#7e7e7e" : COLORS.primary,
          }}
          disabled={disabled}
          onPress={handleUserLogin}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontFamily: FONTS.medium,
                letterSpacing: 1,
              }}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>
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
        color={"#E2E2E2"}
        icon={
          <Image
            source={assets.google}
            resizeMode="cover"
            style={{ width: 30, height: 30, position: "relative", right: 60 }}
          />
        }
        onPress={signIn}
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

export default LoginScreen;

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
