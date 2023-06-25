import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { assets, COLORS, SIZES, FONTS } from "../../constants";
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREENS } from "../../types/screens";
import { useUserStore } from "../../store/userStore";
import { userRegistration } from "../../api/loaders";
import Loader from "../../components/Loader";

type RegisterProps = {
  navigation: any;
};

interface IUser {
  fullName: string;
  email: string;
  password: string;
}

const RegisterScreen = ({ navigation }: RegisterProps) => {
  const [formData, setFormData] = useState<IUser>({
    fullName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setToken = useUserStore((v) => v.setAccessToken);

  const handleUserRegistration = () => {
    setIsLoading(true);
    userRegistration(formData.fullName, formData.email, formData.password).then(
      (response) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        console.log(response);
        setToken(response["access_token"]);
      }
    );
  };
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
          value={formData.fullName}
          onChangeText={(text) =>
            setFormData((prevData) => ({
              ...prevData,
              fullName: text,
            }))
          }
        />
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
        <Text style={styles.agreement}>
          By signing up, you’re agree to our{" "}
          <Text style={styles.specialText}>Terms & Conditions</Text> and{" "}
          <Text style={styles.specialText}>Privacy Policies</Text>
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            height: 50,
            justifyContent: "center",
            backgroundColor: COLORS.primary,
          }}
          onPress={handleUserRegistration}
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
              Create account
            </Text>
          )}
        </TouchableOpacity>
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
