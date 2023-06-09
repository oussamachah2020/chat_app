import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONTS, SIZES, assets } from "../../constants";

type Props = {};

const Home = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <assets.ProfileImage />
          <Text
            style={{
              fontFamily: FONTS.medium,
              fontSize: 14,
            }}
          >
            Hi, Oussama Chahidi !
          </Text>
        </View>
        {/* <View style={{ position: "relative" }}>
          <assets.NotificationsBell />
          <View style={styles.notificationsCounterContainer}>
            <Text
              style={{
                color: "white",
                fontFamily: FONTS.medium,
                fontSize: SIZES.medium,
                textAlign: "center",
                // paddingHorizontal: 2,
              }}
            >
              1
            </Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default Home;

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
    // position: "absolute",
    // right: 0,
    // top: 0,
  },
});
