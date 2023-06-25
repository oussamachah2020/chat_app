import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Description from "./screens/Description";
import { COLORS, FONTS, SIZES } from "./constants";
import { SCREENS } from "./types/screens";
import PasswordRestoration from "./screens/PasswordRestoration";
import ProfileScreen from "./screens/user/ProfileScreen";
import HomeScreen from "./screens/Chat/HomeScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import NavigationBar from "./components/NavigationBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "./screens/Chat/SettingsScreen";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function App() {
  const accessToken = useUserStore((v) => v.accessToken);
  // useEffect(() => {
  //   console.log(accessToken);
  // }, []);

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

  const Tab = createBottomTabNavigator();

  return (
    <>
      {accessToken === "" ? (
        <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name={SCREENS.DESCRIPTION_SCREEN}
              component={Description}
            />
            <Stack.Screen
              name={SCREENS.REGISTER_SCREEN}
              component={RegisterScreen}
            />
            <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen
              name={SCREENS.RESTORATION_SCREEN}
              component={PasswordRestoration}
            />
            <Stack.Screen
              name={SCREENS.HOME_SCREEN}
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={SCREENS.PROFILE_SCREEN}
              component={ProfileScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name={SCREENS.HOME_SCREEN}
              component={HomeScreen}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={COLORS.secondary} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name={SCREENS.PROFILE_SCREEN}
              component={ProfileScreen}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" color={COLORS.secondary} size={25} />
                ),
              }}
            />
            <Tab.Screen
              name={SCREENS.SETTINGS_SCREEN}
              component={SettingsScreen}
              options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="settings"
                    color={COLORS.secondary}
                    size={25}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
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
