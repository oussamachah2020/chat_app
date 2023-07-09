import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { assets, COLORS, SIZES, FONTS } from "../../constants";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { SCREENS } from "../../types/screens";
import { useUserStore } from "../../store/userStore";
// import { userRegistration } from "../../api/loaders";
import Loader from "../../components/Loader";
import Toast from "react-native-toast-message";
import { Button, Overlay } from "react-native-elements";
import ModalToast from "../../components/ModalToast";
import { IconButton } from "react-native-paper";
import VerificationModal from "../../components/VerificationModal";
import { createUser } from "../../api/loaders";

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

  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [togglePasswordVisibility, setTogglePasswordVisibility] =
    useState<boolean>(false);

  const setTmpToken = useUserStore((v) => v.setTmpToken);
  const setEmail = useUserStore((v) => v.setEmail);

  const handleUserRegistration = () => {
    console.log(formData);

    setIsLoading(true);
    createUser(formData)
      .then((result) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
        setEmail(formData.email);
        setTmpToken(result.data.access_token);
        setVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setFormData({
      fullName: "",
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (
      formData.email === "" ||
      formData.fullName === "" ||
      formData.password === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [disabled, formData]);

  return (
    <View style={styles.container}>
      {visible ? (
        <ModalToast
          visible={visible}
          setVisible={setVisible}
          setIsVisible={setIsVisible}
          title="Account has been created successfully!"
          text="if you didn’t receive any code,"
          link="click here please!"
        />
      ) : (
        <VerificationModal isVisible={isVisible} />
      )}

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
          secureTextEntry={togglePasswordVisibility ? false : true}
          placeholder="Password"
          inputStyle={{ paddingLeft: 5 }}
          leftIcon={<Icon name="lock" size={25} color={"#7C56EC"} />}
          rightIcon={
            <TouchableOpacity
              onPress={() =>
                setTogglePasswordVisibility(!togglePasswordVisibility)
              }
            >
              <Icon
                name={togglePasswordVisibility ? "eye" : "eye-slash"}
                size={20}
              ></Icon>
            </TouchableOpacity>
          }
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
            backgroundColor: disabled ? "#7e7e7e" : COLORS.primary,
          }}
          disabled={disabled}
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
