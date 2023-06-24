import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Badge } from "react-native-paper";
import { FONTS, assets } from "../constants";

type Props = {
  chat: {
    id: string;
    fullName: string;
    profilePic: string;
    message: string;
    time: string;
  };
};

function NewChats({ chat }: Props) {
  return (
    <TouchableOpacity
      key={chat.id}
      style={{
        marginTop: 15,
        // backgroundColor: "red",
        // width: "100%",
      }}
    >
      <View style={styles.messageContainer}>
        <Avatar.Image size={50} source={chat.profilePic} />

        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "68%",
            }}
          >
            <Text style={styles.username}>{chat.fullName}</Text>
            <Text
              style={{
                fontFamily: FONTS.RobotoRegular,
              }}
            >
              {chat.time}
            </Text>
          </View>
          <Text style={styles.message}>{chat.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default NewChats;

const styles = StyleSheet.create({
  messageContainer: {
    marginTop: 8,
    marginLeft: 20,
    flexDirection: "row",
    // justifyContent:
    alignItems: "center",
    gap: 8,
  },
  message: {
    fontFamily: FONTS.RobotoBold,
    fontSize: 12,
    lineHeight: 14.06,
    marginTop: 1,
  },
  username: {
    fontFamily: FONTS.RobotoMedium,
  },
});
