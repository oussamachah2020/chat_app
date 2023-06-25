import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FONTS, SIZES, assets } from "../../constants";
import UsersList from "../../components/UsersList";
import { FlashList } from "@shopify/flash-list";
import { chats, users } from "../../constants/defaultData";
import NewChats from "../../components/NewChats";
import { Badge } from "react-native-paper";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { SCREENS } from "../../types/screens";
import NavigationBar from "../../components/NavigationBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../user/ProfileScreen";
import { useUserStore } from "../../store/userStore";
import { getUserInfo } from "../../api/loaders";
import { Toast } from "react-native-toast-message/lib/src/Toast";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

type HomeProps = {
  navigation: any;
};

const HomeScreen = ({ navigation }: HomeProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const onStateChange = () => setOpen(!open);
  const accessToken = useUserStore((v) => v.accessToken);
  const fullName = useUserStore((v) => v.fullName);
  const setEmail = useUserStore((v) => v.setEmail);
  const setFullName = useUserStore((v) => v.setFullName);

  useEffect(() => {
    getUserInfo(accessToken).then((response) => {
      setFullName(response["fullName"]);
      setEmail(response["email"]);
    });
  }, [accessToken]);

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Toast />

      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image source={assets.ProfilePic} alt="profile_pic" />
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: 14,
            }}
          >
            Hello, {fullName} !
          </Text>
        </View>
        <View style={{ position: "relative" }}>
          <TouchableOpacity>
            <Image
              source={assets.Bell}
              alt="profile_pic"
              style={{
                width: 30,
                height: 30,
              }}
            />
            <View style={styles.notificationsCounterContainer}>
              <Badge
                style={{
                  backgroundColor: "#E84F4F",
                }}
              >
                1
              </Badge>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          marginLeft: 20,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.RobotoMedium,
            fontSize: 16,
          }}
        >
          Contact:
        </Text>
        <Text
          style={{
            marginLeft: 10,
            fontFamily: FONTS.RobotoMedium,
            fontSize: 16,
          }}
        >
          48 peoples
        </Text>
      </View>
      <FlashList
        data={users}
        renderItem={({ item }) => <UsersList user={item} />}
        estimatedItemSize={50}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <Text
        style={{
          fontWeight: "700",
          fontFamily: FONTS.RobotoMedium,
          fontSize: 16,
          marginTop: 40,
          marginLeft: 20,
        }}
      >
        Conversations
      </Text>
      <FlashList
        data={chats}
        renderItem={({ item }) => <NewChats chat={item} />}
        estimatedItemSize={100}
        horizontal={false}
      />

      {/* <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "chevron-up" : "plus"}
          actions={[
            {
              icon: "plus",
              onPress: () => console.log("Pressed add"),
              label: "New Chat",
            },
            {
              icon: "account",
              label: "Profile",
              onPress: () => navigation.push(SCREENS.PROFILE_SCREEN),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
          variant="primary"
        />
      </Portal> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
  },
  notificationsCounterContainer: {
    backgroundColor: "#E84F4F",
    borderRadius: 50,
    height: 20,
    width: 20,
    position: "absolute",
    right: -2,
    top: -5,
  },
});
