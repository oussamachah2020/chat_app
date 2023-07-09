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

import { useUserStore } from "../../store/userStore";
// import { getUserInfo } from "../../api/loaders";
import toastStore from "../../store/toastStore";
import Toast from "../../components/Toast";
import { getUserInfo } from "../../api/loaders";

type HomeProps = {
  navigation: any;
};

const HomeScreen = ({ navigation }: HomeProps) => {
  const { accessToken, fullName, setEmail, setFullName } = useUserStore();
  const isVisible = toastStore((v) => v.isVisible);

  useEffect(() => {
    console.log(accessToken);

    getUserInfo(accessToken).then((result: any) => {
      setFullName(result.data.fullName);
      setEmail(result.data.email);
    });
  }, [accessToken]);

  return (
    <>
      {isVisible && <Toast />}
      <View style={styles.container}>
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
    </>
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
