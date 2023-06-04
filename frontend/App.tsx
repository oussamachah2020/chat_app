import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Description from "./screens/Description";
import { FONTS, SIZES } from "./constants";
import { SCREENS } from "./types/screens";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import PasswordRestoration from "./screens/PasswordRestoration";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  const [loaded] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins/Poppins-Light.ttf"),

    RobotoMedium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={SCREENS.DESCRIPTION_SCREEN}
          component={Description}
        />
        <Stack.Screen name={SCREENS.REGISTER_SCREEN} component={Register} />
        <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={Login} />
        <Stack.Screen
          name={SCREENS.RESTORATION_SCREEN}
          component={PasswordRestoration}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    textAlign: "center",
    marginHorizontal: 50,
  },
});
